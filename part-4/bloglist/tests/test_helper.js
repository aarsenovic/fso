const Blog = require('../models/blog')
const User = require('../models/users')

const initialBlogs = [
    {
        title: 'Linux is cool',
        author: 'Linus Torvalds',
        url: 'https://archlinux.org/linux-is-cool',
        likes: 100,
    },
    {
        title: 'Canonical string reduction"',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 90,
    }
]



const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}