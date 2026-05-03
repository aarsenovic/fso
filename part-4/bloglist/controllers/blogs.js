const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')




blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {

  const body = request.body

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }



})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {


  const user = request.user


  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  
 

  if (blog.user.toString() === user.id) {
    await blog.deleteOne()
    return response.status(204).end()
  } else {
    return response.status(403).end()
  }



})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body


  try {
    const blogForChanging = await Blog.findById(request.params.id)

    if (!blogForChanging) {
      return response.status(404).json({ error: 'blog not found' })
    }

    blogForChanging.title = title
    blogForChanging.author = author
    blogForChanging.url = url
    blogForChanging.likes = likes
    const savedBlog = await blogForChanging.save()
    return response.status(200).json(savedBlog)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }


})




module.exports = blogRouter
