const blogRouter = require('express').Router()
const Blog = require('../models/blog')



blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)


  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    return response.status(400).json({error: error.message})
  }



})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body


  try {
    const blogForChanging = await Blog.findById(request.params.id)

    if(!blogForChanging) {
      return response.status(404).json({ error: 'blog not found' })
    }

    blogForChanging.title = title
    blogForChanging.author = author
    blogForChanging.url = url
    blogForChanging.likes = likes
    const savedBlog = await blogForChanging.save()
    return response.status(200).json(savedBlog)
  } catch(error) {
    return response.status(400).json({error: error.message})
  }


})




module.exports = blogRouter