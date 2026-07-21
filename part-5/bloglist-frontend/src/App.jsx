import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Blog from './components/Blog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage ] = useState(null)

  const navigate = useNavigate()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])



  const blogFormRef = useRef()

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    navigate('/')
  }




  const createBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (error) {
      setMessage(`blog creation failed. Reason ${error.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const handleLike = async ( blog ) => {

    const updateData = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }



    const updatedBlog = await blogService.update(blog.id, updateData)
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b ))
  }

  const handleDelete = async(blog) => {

    if(window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }



  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {user === null ?<Link style={padding} to="/login">login</Link> :<button onClick={handleLogOut}>Logout</button>}

      </div>

      <Notification message={message} />
      <Routes>
        <Route path='/blogs/:id' element={<Blog blogs={blogs}  user={user} handleLike={handleLike} handleDelete={handleDelete}/>} />
        <Route path='/' element={<BlogList blogs={blogs} />}/>
        <Route path='/login' element={<Login setMessage={setMessage} setUser={setUser}/>}/>
      </Routes>


    </div>



  )
}

export default App










