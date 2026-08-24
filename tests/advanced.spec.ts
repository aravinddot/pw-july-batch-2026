import { test, expect, chromium, firefox, webkit } from '@playwright/test'



test.describe('Sandbox Advanced Test cases', ()=> {


    test('Dynamic Dropdown', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const isDisabled = await page.getByTestId('dynamic-option-select').isDisabled()

        if(isDisabled === true){

            await page.getByTestId('dynamic-group-select').selectOption('Locators')
        }

         const isEnabled = await page.getByTestId('dynamic-option-select').isDisabled()

         if(isEnabled === false){

            await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')
         }

         await expect(page.getByText('Dynamic dropdown selected: getByRole + name.')).toBeVisible()

    })



    test('Hidden Dropdown', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible()

        if(isVisible == false) {

            await page.getByTestId('hidden-dropdown-toggle-btn').click()
        }

         const isVisibleHiddenDrpDwn = await page.getByTestId('hidden-dropdown-select').isVisible()

         if(isVisibleHiddenDrpDwn === true){
            await page.getByTestId('hidden-dropdown-select').selectOption('Hidden - Core')
         }

         await expect(page.getByText('Hidden dropdown selected: Hidden - Core.')).toBeVisible()


    })



    test('Boostrap dropdown', async({page})=> {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('bootstrap-dropdown-trigger').click()

        const isVisible = await page.getByTestId('bootstrap-dropdown-menu').isVisible()

        if(isVisible === true){

            await page.getByTestId('bootstrap-dropdown-menu').getByText('Weekday Batch').click()

        }

        await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()

    })




    test('Handling Alert Popup', async({page})=> {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // page.on('dialog', async(dialog)=> {
        //     console.log("Alert message===>"+ dialog.message())
        //     await dialog.accept()
        // })

        // await page.getByTestId('alert-btn').click()

        // await expect(page.getByText('Alert handled.')).toBeVisible()



        // page.on('dialog', async(dialog)=> {
        //     console.log("Alert message===>"+ dialog.message())
        //     await dialog.dismiss()
        // })

        // await page.getByTestId('confirm-btn').click()

        // await expect(page.getByText('Confirm dismissed.')).toBeVisible()



        page.on('dialog', async(dialog)=> {
            console.log("Alert message===>"+ dialog.message())
            await dialog.accept("playwright")
        })

        await page.getByTestId('prompt-btn').click()

        await expect(page.getByText('Prompt value: playwright')).toBeVisible()



    })




    test('Handling new tab', async()=> {


        const browser = await chromium.launch()

        const context = await browser.newContext()

        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.getByTestId('popup-link').click()
        ])

        await expect(newPage.getByText('Popup Opened Successfully')).toBeVisible()

        await newPage.waitForTimeout(3000)

        await page.bringToFront()

        await page.waitForTimeout(3000)




    })


















})