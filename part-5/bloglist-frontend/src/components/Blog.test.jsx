import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders title and authot', () => {
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