import { useState } from 'react'
import styled from 'styled-components'


const StyledInput = styled.input`
  border-radius: 6px;
  border: 2px solid gray;
  padding; 10px;
`

const StyledButton = styled.button`
  color:white;
  background-color: blue;
  padding: 8px;
  font-size: 20px;
`

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
                title
            <StyledInput
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
                author
            <StyledInput
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
                url
            <StyledInput
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <StyledButton type='submit'>Submit</StyledButton>
      </form>

    </>
  )
}




export default NewBlogForm