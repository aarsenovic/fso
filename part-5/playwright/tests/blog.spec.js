const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createNote, likeBlogNTimes } = require('./helper')

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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'tester',
        username: 'testuser2',
        password: 'tester1234'
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
      await loginWith(page, 'testuser', 'tester123')
      await expect(page.getByText('login successful')).toBeVisible()

    })

    test('a new blog can be created', async ({ page }) => {
      await createNote(page, 'Test-blog', 'Master Tester', 'testwebsite/testpost')
      await expect(page.getByText('a new blog Test-blog by Master Tester added')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createNote(page, 'Likes-test', 'Master Liker', 'website/liker-test')

      await page.getByRole('button', { name: 'show' }).click()

      await expect(page.getByText('0')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('1')).toBeVisible()
    })


    test('a blog can be deleted', async ({ page }) => {
      await createNote(page, 'Delete-test', 'Master Deleter', 'website/deleter')

      page.on('dialog', async dialog => {
        if (dialog.type() === 'confirm') {
          await dialog.accept()
        }
      });

      const deleteTest = page.locator('.blog', { hasText: 'Delete-test' })

      await deleteTest.getByRole('button', { name: 'show' }).click()

      await deleteTest.getByRole('button', { name: 'Remove' }).click()

      await expect(page.getByText('Delete-test')).toHaveCount(0)
    })

    test('only user that created blog sees remove button', async ({ page }) => {
      await createNote(page, 'Another-User-Test', 'Master', 'website/ubertester')

      const visible = page.locator('.blog', { hasText: 'Another-User-Test' })

      await visible.getByRole('button', { name: 'show' }).click()


      await expect(visible.getByText('Remove')).toHaveCount(1)

      await page.getByRole('button', { name: 'Logout' }).click()


      await loginWith(page, 'testuser2', 'tester1234')

      await visible.getByRole('button', { name: 'show' }).click()

      await expect(visible.getByText('Remove')).toHaveCount(0)
    })


    test('blogs are ordered by number of likes', async ({ page }) => {
      await createNote(page, 'First', 'Master', 'website/first')
      await expect(page.locator('.blog', { hasText: 'First' })).toBeVisible()

      await createNote(page, 'Second', 'Master', 'website/second')
      await expect(page.locator('.blog', { hasText: 'Second' })).toBeVisible()

      await createNote(page, 'Third', 'Master', 'website/third')
      await expect(page.locator('.blog', { hasText: 'Third' })).toBeVisible()

      await likeBlogNTimes(page, 'First', 3)
      await likeBlogNTimes(page, 'Second', 2)
      await likeBlogNTimes(page, 'Third', 1)

      const blogs = await page.locator('.blog').allTextContents()
      expect(blogs[0]).toContain('First')
      expect(blogs[1]).toContain('Second')
      expect(blogs[2]).toContain('Third')
    })


  })


})




