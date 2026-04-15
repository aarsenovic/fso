const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { all } = require('../controllers/blogs')

const api = supertest(app)





beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})


test("blog post's unique identifier is called id", async () => {
  const response = await api.get('/api/blogs')
  const allHaveId = response.body.every(object => Object.hasOwn(object, 'id') && !Object.hasOwn(object, '_id'))

  assert.strictEqual(allHaveId, true)
})

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: 'Archlinux is the best',
    author: 'Linus Torvalds',
    url: 'https://archlinux.org/linux-is-cool',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)

  assert.strictEqual(contents.includes('Archlinux is the best'), true)

})


test('like property is missing from request, default is 0', async () => {
  const newBlog = {
    title: 'Archlinux is the best',
    author: 'Linus Torvalds',
    url: 'https://archlinux.org/archlinux-is-the-best',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const lastAddedBlog = blogsAtEnd.find(blog => blog.url === newBlog.url)

  assert.strictEqual(lastAddedBlog.likes === 0, true)

})

test('title is missing, return 400', async () => {
  const newBlog = {
    author: 'Linus Torvalds',
    url: 'https://archlinux.org/archlinux-is-the-best',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('url is missing, return 400', async () => {
  const newBlog = {
    title: 'Archlinux is the best',
    author: 'Linus Torvalds',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})


after(async () => {
  await mongoose.connection.close()
})