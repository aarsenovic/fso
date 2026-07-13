const {  expect } = require('@playwright/test')



const loginWith = async (page, username, password)  => {
      await page.getByLabel('username').fill(username)
      await page.getByLabel('password').fill(password)

      await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, title, author, url) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByLabel('title').fill(title)
      await page.getByLabel('author').fill(author)
      await page.getByLabel('url').fill(url)
      await page.getByRole('button', { name: 'Submit' }).click()
}

const likeBlogNTimes = async (page, title, n) => {
  const blog = page.locator('.blog', { hasText: title })
  await blog.getByRole('button', { name: 'show' }).click()

  const likesCount = blog.getByTestId('likes-count')

  for (let i = 0; i < n; i++) {
    await blog.getByRole('button', { name: 'like' }).click()
    await expect(likesCount).toHaveText(`${i + 1}`)
  }
}



export { loginWith, createNote, likeBlogNTimes }