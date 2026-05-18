import { useState } from 'react'
import blogService from '../services/blogs'


const NewBlogForm = ({ blogs, setBlogs, setMessage, toggleVisibility }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    
    const handleBlogCreation = async event => {
        event.preventDefault()
        
        const newObject = {
            title: title,
            author: author,
            url: url,
        }


        try {
            const returnedBlog = await blogService.create(newObject)

            toggleVisibility()

            setBlogs(blogs.concat(returnedBlog))

            
            setTitle('')
            setAuthor('')
            setUrl('')
            setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch(error){
            setMessage(`blog creation failed. Reason ${error.response.data.error}`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }


    }

    return (
        <>
            <h2>Create New</h2>
            <form onSubmit={handleBlogCreation}>
                <div>
                    <label>
                        title
                        <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author
                        <input
                            type="text"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        url
                        <input
                            type="text"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </label>
                </div>
                <button type='submit'>Submit</button>
            </form>

        </>
    )
}




export default NewBlogForm