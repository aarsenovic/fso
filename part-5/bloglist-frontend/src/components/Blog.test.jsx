import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'





test('Unauthorized user sees content but no buttons', () => {
  const blogExample = {
    title: 'Test Title',
    author: 'Mr. Test',
    url: 'hissite/test',
    likes: 0,
    user:  {
      username: 'Mr.Test',
    }
  }

  render(<Blog blog={blogExample} user={null}/>)

  const title = screen.getByText('Test Title')
  const author = screen.getByText('Mr. Test')
  const url = screen.queryByText('hissite/test')
  const likes = screen.queryByText('0')

  const likeButton = screen.queryByText('like')
  const removeButton = screen.queryByText('Remove')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(likeButton).toBeNull()
  expect(removeButton).toBeNull()

})


test('Authenticated users who are not the blog’s creator are shown only the like button', () => {
  const blogExample = {
    title: 'Test Title',
    author: 'Mr. Test',
    url: 'hissite/test',
    likes: 0,
    user:  {
      username: 'Mr.Test',
    }
  }

  const userExample = {
    username: 'Shura'
  }

  render(<Blog blog={blogExample} user={userExample}/>)

  const title = screen.getByText('Test Title')
  const author = screen.getByText('Mr. Test')
  const url = screen.queryByText('hissite/test')
  const likes = screen.queryByText('0')

  const likeButton = screen.queryByText('like')
  const removeButton = screen.queryByText('Remove')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(likeButton).toBeDefined()
  expect(removeButton).toBeNull()

})

test('The blog’s creator is also shown the delete button', () => {
  const blogExample = {
    title: 'Test Title',
    author: 'Mr. Test',
    url: 'hissite/test',
    likes: 0,
    user:  {
      username: 'Mr.Test',
    }
  }

  const userExample = {
    username: 'Mr.Test'
  }

  render(<Blog blog={blogExample} user={userExample}/>)

  const title = screen.getByText('Test Title')
  const author = screen.getByText('Mr. Test')
  const url = screen.queryByText('hissite/test')
  const likes = screen.queryByText('0')

  const likeButton = screen.queryByText('like')
  const removeButton = screen.queryByText('Remove')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(likeButton).toBeDefined()
  expect(removeButton).toBeDefined()

})




test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Test',
    author: 'Me',
    url: 'test.com',
    likes: 0,
    user: { username: 'me', id: '1' }
  }


  const userExample = {
    username: 'me'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={userExample} handleLike={mockHandler}/>)

  const user = userEvent.setup()


  const likeBtn = screen.getByText('like')

  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)

})