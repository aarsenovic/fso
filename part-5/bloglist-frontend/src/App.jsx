import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage ] = useState(null)

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
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      </>
    )

  }

  return (
    <div>
      <h2>blogs</h2>
      <button onClick={handleLogOut}>Logout</button>
      <p>{user.name} is logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}


      <NewBlogForm blogs={blogs} setBlogs={setBlogs}/>
    </div>
  )
}

export default App