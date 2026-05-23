import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs,user }) => {

  const [shown, setShown] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setShown(prev => !prev)
  }

  const handleLike = async event => {
      event.preventDefault()

      const updateData = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      }

      console.log(updateData)

    const updatedBlog = await blogService.update(blog.id, updateData)

    
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b ))


  }

  const handleDelete = async event => {
    event.preventDefault()

    if(window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)) {
      const deletedBlog = await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title}<button onClick={toggleVisibility}>{shown ? 'hide' : 'show'}</button>
      </div>
      {shown &&
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes}<button onClick={handleLike}>like</button></div>
          <div>{blog.author}</div>
          {user.username === blog.user.username ?<button onClick={handleDelete}>Remove</button> :null}
        </div>}
      
    </div>
  )
}


export default Blog