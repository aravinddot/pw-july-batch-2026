import {test, expect} from '@playwright/test'
import fs from 'fs'


test('Tables and Pagination', async({page}) => {

    const obj: {[key: string]: string[]} = {}

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')

    await expect(page.getByRole('heading', {name: 'Filter Controls'})).toBeVisible()


    await page.getByTestId('page-size-select').selectOption('100')

    const rowCount = await page.locator('tbody tr').count()

    console.log("rowCount===>"+ rowCount)

    const pageCount = await page.getByTestId('pagination-current').innerText()

    console.log("pageCount===>"+ pageCount)

    const splittedValue = pageCount.split(' ')

    console.log("splittedValue===>"+ splittedValue)

    console.log(splittedValue[3])


    for(let i = 1; i <= Number(splittedValue[3]); i++) {
        
        for(let j = 0; j < rowCount; j++) {

            const row = await page.locator('tbody tr').nth(j).locator('td').allInnerTexts()

            const key = row[0]

            obj[key] = row

        }
        

        if(i != Number(splittedValue[3])) {
            await page.getByTestId('pagination-next').click()
        }
    }

    fs.writeFileSync('data.json', JSON.stringify(obj))

})