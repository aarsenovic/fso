import { useState } from 'react'
import { useParams } from 'react-router-dom'


const Blog = ({ blogs, user, handleLike, handleDelete }) => {

  const [shown, setShown] = useState(false)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const toggleVisibility = () => {
  //   setShown(prev => !prev)
  // }

  if (!blog) {
    return null
  }


  return (

    <div style={blogStyle} className='blog'>
      <div>
        {/* <button onClick={toggleVisibility}>{shown ? 'hide' : 'show'}</button> */}
        <div>{blog.title}</div>
        <div>{blog.author}</div>
      </div>
      {/* {shown && */}
      <div>
        <div>{blog.url}</div>
        {user ?<div><span data-testid="likes-count">{blog.likes}</span><button onClick={() => handleLike(blog)}>like</button></div>  :null}
        {user?.username === blog.user.username ?<button onClick={() => handleDelete(blog)}>Remove</button> :null}
      </div>
    </div>
  )
}


export default Blog