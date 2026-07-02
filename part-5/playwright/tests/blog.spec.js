const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'tester',
        username: 'testuser',
        password: 'tester123'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {


    await expect(page.getByRole('heading', { name: 'Login form' })).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()

  })

  describe('Login', () => {
    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukai')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('tester123')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('login successful')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('tester123')

      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('login successful')).toBeVisible()

    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('Test-blog')
      await page.getByLabel('author').fill('Master Tester')
      await page.getByLabel('url').fill('testwebsite/testpost')
      await page.getByRole('button', { name: 'Submit' }).click()
      await expect(page.getByText('a new blog Test-blog by Master Tester added')).toBeVisible()
    })
  })

})




