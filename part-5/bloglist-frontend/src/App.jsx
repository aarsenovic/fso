import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

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

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}


      <NewBlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
    </div>
  )
}

export default App