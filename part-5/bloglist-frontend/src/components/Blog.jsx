import { useState } from 'react'


const Blog = ({ blog, user, handleLike, handleDelete }) => {

  const [shown, setShown] = useState(false)

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

  return (

    <div style={blogStyle}>
      <div>
        <div>{blog.title}<button onClick={toggleVisibility}>{shown ? 'hide' : 'show'}</button></div>
        <div>{blog.author}</div>
      </div>
      {shown &&
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes}<button onClick={() => handleLike(blog)}>like</button></div>
          {user.username === blog.user.username ?<button onClick={() => handleDelete(blog)}>Remove</button> :null}
        </div>}
    </div>
  )
}


export default Blog