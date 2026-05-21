import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {

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

    console.log("apdejtovan blog",updatedBlog)
    
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b ))


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
        </div>}
    </div>
  )
}


export default Blog