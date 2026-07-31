import styled from 'styled-components'


const StyledHeader = styled.div`
font-size: 25px;
margin-top: 15px;
margin-bottom: 15px;
color: black;
`
const StyledParagraph = styled.div`
font-size: 15px;
color: gray;
margin-top: 15px;
margin-bottom: 15px;
`

const StyledLike = styled.span`
font-size: 15px; 
color: darkblue;
margin-right: 15px;
`

const StyledLikeButton = styled.button`
padding: 8px;
color: darkblue;
border: 2px solid light blue;
font-size: 15px
`
const StyledDeleteButton = styled.button`
padding: 8px;
color: red;
border: 2px solid red;
font-size: 15px;
margin-left: 20px;
`

const Blog = ({ blog, user, handleLike, handleDelete }) => {



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  if (!blog) {
    return null
  }


  return (

    <div style={blogStyle} className='blog'>
      <div>
        {/* <button onClick={toggleVisibility}>{shown ? 'hide' : 'show'}</button> */}
        <StyledHeader>{blog.title}</StyledHeader>
        <StyledParagraph>{blog.author}</StyledParagraph>
      </div>
      {/* {shown && */}
      <div>
        <StyledParagraph>{blog.url}</StyledParagraph>
        {user ?<div><StyledLike data-testid="likes-count">{blog.likes}</StyledLike><StyledLikeButton onClick={() => handleLike(blog)}>like</StyledLikeButton></div>  :null}
        {user?.username === blog.user.username ?<StyledDeleteButton onClick={() => handleDelete(blog)}>Remove</StyledDeleteButton> :null}
      </div>
    </div>
  )
}


export default Blog