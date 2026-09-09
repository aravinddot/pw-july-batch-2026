import { test, expect } from '@playwright/test';

test("Test case 1", async({page})=> {


  await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

  await page.getByTestId('single-click-btn').click()

  await expect(page.getByText('Single click completed.')).toBeVisible()

  await page.waitForTimeout(10000)


})



test('Handling chaining locators', async({page})=> {

  await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')


  const dataOne = await page.locator('tr td').getByLabel('aa').getByText('').locator('').allInnerTexts()

  console.log(dataOne)


  const dataTwo = await page.locator('tbody tr').nth(2).allInnerTexts()

  console.log(dataTwo)


  const dataThree = await page.locator('tbody tr td').filter({hasText: 'BDD Framework'}).allInnerTexts()

  console.log(dataThree)



})