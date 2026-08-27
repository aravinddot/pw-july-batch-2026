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


    test('Handling new tab direct click blocked', async()=> {

        
        const browser = await chromium.launch()

        const context = await browser.newContext()

        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('popup-right-click-link').click()

        await expect(page.getByText('Direct click blocked. Use right click -> Open link in new tab.')).toBeVisible()


        const link = await page.getByTestId('popup-right-click-link').getAttribute('href')

        console.log("Link===>"+link)


        const pageTwo = await context.newPage()

        await pageTwo.goto(`https://playwright-mastery-academy-app.vercel.app/${link}`)


        await expect(pageTwo.getByText('Popup Opened Successfully')).toBeVisible()


    })



    test('Isolated context', async()=> {

        test.setTimeout(180000)

        const browser = await chromium.launch()

        const context = await browser.newContext()

        const page = await context.newPage()


        await page.goto('https://testcms.reco-claims.ca/Login')

        await page.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')

        await page.locator('[name="Password"]').fill('XlgTest-2026!')

        await page.locator('[type="submit"]').click()

        await page.waitForTimeout(15000)

//---------------------------------------------------------------------------------

         const contextTwo = await browser.newContext()

        const pageTwo = await contextTwo.newPage()


        await pageTwo.goto('https://testcms.reco-claims.ca/Login')

        await pageTwo.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')

        await pageTwo.locator('[name="Password"]').fill('XlgTest-2026!')

        await pageTwo.locator('[type="submit"]').click()

        await pageTwo.waitForTimeout(15000)


        const cookie = await context.cookies()

        const cookieTwo = await contextTwo.cookies()

        console.log("Cookie One===>"+JSON.stringify(cookie))

        console.log("Cookie Two===>"+JSON.stringify(cookieTwo))


    })


    test('Handling drag and drop', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('drag-source').dragTo(page.getByTestId('drop-target'))

        await expect(page.getByText('Drop completed successfully.')).toBeVisible()


    })


    test('Single and multiple files upload', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('file-upload-input').setInputFiles('uploads/practice-report.pdf')

        await expect(page.getByText('practice-report.pdf uploaded successfully.')).toBeVisible()



        await page.getByTestId('multi-file-upload-input').setInputFiles([
            'uploads/practice-data.csv',
            'uploads/practice-data.xml',
            'uploads/practice-notes.txt',
            'uploads/practice-report.pdf'
        ])

        await expect(page.getByText('4 files uploaded')).toBeVisible()

    })



    test('Handling downloads', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-csv-btn').click()
        ])

        const fileName = download.suggestedFilename()
        console.log("File name===>"+fileName)
        await download.saveAs(`downloads/${fileName}`)
    })



    test('handling Iframe', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const iframe = await page.frameLocator('[id="practice-iframe"]')


        await iframe.locator('[id="frame-input"]').fill('Playwright')

        await iframe.locator('[id="frame-save"]').click()

        await expect(iframe.locator('[id="frame-result"]')).toContainText('Playwright saved')

    })


    test('Handling Shadow DOM', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const shadowRoot = await page.getByTestId('shadow-host')
    
        await shadowRoot.locator('[id="shadow-input"]').fill('Automation Testing')

        await shadowRoot.locator('[id="shadow-save"]').click()

        await expect(shadowRoot.locator('[id="shadow-result"]')).toContainText('Automation Testing saved')


    })



    test('Handling Practice date', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('practice-date-picker').type('01-11-1993')

        await page.getByTestId('practice-date-picker').fill('1993-11-01')

        await expect(page.getByText('Practice Date Selected: 1993-11-01')).toBeVisible()


    })


    test('handling interview date', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        // await page.getByTestId('interview-date-picker').fill('2024-06-01')

        // await expect(page.getByText('Interview Date Selected: 2024-06-01')).toBeVisible()


        const interviewDate = await page.getByTestId('interview-date-picker')

        interviewDate.evaluate((dom, val)=> {

            const html = dom as HTMLInputElement

            html.value = val as string

            html.dispatchEvent(new Event('input'))
            html.dispatchEvent(new Event('change'))


        }, '2024-06-01')


        await page.waitForTimeout(5000)


    })















})