const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDb
}