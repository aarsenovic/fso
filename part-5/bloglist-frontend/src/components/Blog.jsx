import { useState } from "react"

const Blog = ({ blog }) => {

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

  return (

    <div style={blogStyle}>
      <div>
        {blog.title}<button onClick={toggleVisibility}>{shown ?'hide' :'show'}</button>
      </div>
      {shown&&
      <div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button>like</button></div>
        <div>{blog.author}</div>  
      </div>}
  </div>
)}


export default Blog