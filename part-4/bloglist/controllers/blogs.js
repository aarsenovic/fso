const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')


// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  //const blog = new Blog(request.body)
  const body = request.body

  let decodedToken

  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch(error) {
      return response.status(401).json({ error:'token invalid' })
  }



  const user = await User.findById(decodedToken.id)

  if(!user) {
    return response.status(400).json({error:'userId missing or not valid'})
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
