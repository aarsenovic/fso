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
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}  user={user}/>
        )}


      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} toggleVisibility={blogFormRef.current?.toggleVisibility}/>
      </Togglable>

    </div>
  )
}

export default App