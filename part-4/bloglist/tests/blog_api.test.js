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


test('blogs are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
} )

test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})


test("blog post's unique identifier is called id", async() => {
  const response = await api.get('/api/blogs')
  const allHaveId = response.body.every(object => Object.hasOwn(object, 'id') && !Object.hasOwn(object, '_id'))

  assert.strictEqual(allHaveId, true)
})





after(async() => {
  await mongoose.connection.close()
})