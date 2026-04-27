const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const api = supertest(app)






beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})
// ...

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('expected `username` to be unique'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('creation fails with proper statuscode and message if password is less than three characters', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'tw',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('Password must contain at least three characters'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})


test('creation fails with proper statuscode and message if both password and username are not present', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    name: 'Superuser',
    password: 'test',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  assert(result.body.error.includes('Both password and username must be given'))

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})


after(async () => {
  await mongoose.connection.close()
})