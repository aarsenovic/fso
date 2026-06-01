import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage ] = useState(null)

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


  if (user === null) {
    return (
      <>
        <h2>Login form</h2>
        <Notification message={message} />
        <Login setUser={setUser} setMessage={setMessage} />
      </>
    )

  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <button onClick={handleLogOut}>Logout</button>
      <p>{user.name} is logged in</p>
      {[...blogs]
        .sort( (a,b ) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete}/>
        )}


      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog}/>
      </Togglable>

    </div>
  )
}

export default App