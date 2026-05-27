import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'


test('renders title and author skips url and likes', () => {
  const blogExample = {
    title: 'Test Title',
    author: 'Mr. Test',
    url: 'hissite/test',
    likes: 0,
  }

  render(<Blog blog={blogExample}/>)

  const title = screen.getByText('Test Title')
  const author = screen.getByText('Mr. Test')
  const url = screen.queryByText('hissite/test')
  const likes = screen.queryByText('0')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()

})


test('once button is clicked url and likes are visible', async () => {
  const blogExample = {
    title: 'Test Title',
    author: 'Mr. Test',
    url: 'hissite/test',
    likes: 0,
    user: {
      username: 'Mr. Test'
    }
  }

  const userExample = {
    username: 'Mr. Test'
  }



  render(<Blog blog={blogExample} user={userExample}/>)

  const user = userEvent.setup()

  const button = screen.getByText('show')
  await user.click(button)

  const url = screen.getByText('hissite/test')
  const likes =  screen.getByText('0')

  expect(url).toBeVisible()
  expect(likes).toBeVisible()


})


test('Clicking like twice updates the state twice', async () => {
  const blog = {
    title: 'Test',
    author: 'Me',
    url: 'test.com',
    likes: 0,
    user: { username: 'me', id: '1' }
  }
  const blogs = [blog]
  const setBlogs = vi.fn()

  const userExample = {
    username: 'me'
  }

  blogService.update = vi.fn().mockResolvedValue({ ...blog, likes: 1 })

  render(<Blog blog={blog} user={userExample} blogs={blogs} setBlogs={setBlogs}/>)

  const user = userEvent.setup()


  const button = screen.getByText('show')
  await user.click(button)

  const likeBtn = screen.getByText('like')

  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(blogService.update).toHaveBeenCalledTimes(2)

})