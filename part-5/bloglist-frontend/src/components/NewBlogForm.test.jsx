import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'




test('<BlogForm/> updates parent state ad calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm createBlog={createBlog}/>)


  const title = screen.getByLabelText('title')
  const author = screen.getByLabelText('author')
  const url = screen.getByLabelText('url')
  const submitButton = screen.getByText('Submit')

  await user.type(title, 'Test')
  await user.type(author, 'Mr.Tester')
  await user.type(url, 'testwebsite/test')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test')
  expect(createBlog.mock.calls[0][0].author).toBe('Mr.Tester')
  expect(createBlog.mock.calls[0][0].url).toBe('testwebsite/test')
})