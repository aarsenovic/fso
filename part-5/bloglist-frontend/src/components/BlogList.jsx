import React from 'react'
import { Link } from 'react-router-dom'


const BlogList = ({ blogs }) => {


  return (
    <div>
      {[...blogs]
        .sort( (a,b ) => b.likes - a.likes)
        .map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}

    </div>
  )
}

export default BlogList