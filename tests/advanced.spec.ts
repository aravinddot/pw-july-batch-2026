import { test, expect, chromium, firefox, webkit } from '@playwright/test'



test.describe('Sandbox Advanced Test cases', () => {


    test('Dynamic Dropdown', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const isDisabled = await page.getByTestId('dynamic-option-select').isDisabled()

        if (isDisabled === true) {

            await page.getByTestId('dynamic-group-select').selectOption('Locators')
        }

        const isEnabled = await page.getByTestId('dynamic-option-select').isDisabled()

        if (isEnabled === false) {

            await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')
        }

        await expect(page.getByText('Dynamic dropdown selected: getByRole + name.')).toBeVisible()

    })



    test('Hidden Dropdown', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible()

        if (isVisible == false) {

            await page.getByTestId('hidden-dropdown-toggle-btn').click()
        }

        const isVisibleHiddenDrpDwn = await page.getByTestId('hidden-dropdown-select').isVisible()

        if (isVisibleHiddenDrpDwn === true) {
            await page.getByTestId('hidden-dropdown-select').selectOption('Hidden - Core')
        }

        await expect(page.getByText('Hidden dropdown selected: Hidden - Core.')).toBeVisible()


    })



    test('Boostrap dropdown', async ({ page }) => {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('bootstrap-dropdown-trigger').click()

        const isVisible = await page.getByTestId('bootstrap-dropdown-menu').isVisible()

        if (isVisible === true) {

            await page.getByTestId('bootstrap-dropdown-menu').getByText('Weekday Batch').click()

        }

        await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()

    })




    test('Handling Alert Popup', async ({ page }) => {


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



        page.on('dialog', async (dialog) => {
            console.log("Alert message===>" + dialog.message())
            await dialog.accept("playwright")
        })

        await page.getByTestId('prompt-btn').click()

        await expect(page.getByText('Prompt value: playwright')).toBeVisible()



    })




    test('Handling new tab', async () => {


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


    test('Handling new tab direct click blocked', async () => {


        const browser = await chromium.launch()

        const context = await browser.newContext()

        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('popup-right-click-link').click()

        await expect(page.getByText('Direct click blocked. Use right click -> Open link in new tab.')).toBeVisible()


        const link = await page.getByTestId('popup-right-click-link').getAttribute('href')

        console.log("Link===>" + link)


        const pageTwo = await context.newPage()

        await pageTwo.goto(`https://playwright-mastery-academy-app.vercel.app/${link}`)


        await expect(pageTwo.getByText('Popup Opened Successfully')).toBeVisible()


    })



    test('Isolated context', async () => {

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

        console.log("Cookie One===>" + JSON.stringify(cookie))

        console.log("Cookie Two===>" + JSON.stringify(cookieTwo))


    })


    test('Handling drag and drop', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('drag-source').dragTo(page.getByTestId('drop-target'))

        await expect(page.getByText('Drop completed successfully.')).toBeVisible()


    })


    test('Single and multiple files upload', async ({ page }) => {

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



    test('Handling downloads', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-csv-btn').click()
        ])

        const fileName = download.suggestedFilename()
        console.log("File name===>" + fileName)
        await download.saveAs(`downloads/${fileName}`)
    })



    test('handling Iframe', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const iframe = await page.frameLocator('[id="practice-iframe"]')


        await iframe.locator('[id="frame-input"]').fill('Playwright')

        await iframe.locator('[id="frame-save"]').click()

        await expect(iframe.locator('[id="frame-result"]')).toContainText('Playwright saved')

    })


    test('Handling Shadow DOM', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const shadowRoot = await page.getByTestId('shadow-host')

        await shadowRoot.locator('[id="shadow-input"]').fill('Automation Testing')

        await shadowRoot.locator('[id="shadow-save"]').click()

        await expect(shadowRoot.locator('[id="shadow-result"]')).toContainText('Automation Testing saved')


    })



    test('Handling Practice date', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('practice-date-picker').type('01-11-1993')

        await page.getByTestId('practice-date-picker').fill('1993-11-01')

        await expect(page.getByText('Practice Date Selected: 1993-11-01')).toBeVisible()


    })


    test('handling interview date', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        // await page.getByTestId('interview-date-picker').fill('2024-06-01')

        // await expect(page.getByText('Interview Date Selected: 2024-06-01')).toBeVisible()


        const interviewDate = await page.getByTestId('interview-date-picker')

        interviewDate.evaluate((dom, val) => {

            const html = dom as HTMLInputElement

            html.value = val as string

            html.dispatchEvent(new Event('input'))
            html.dispatchEvent(new Event('change'))


        }, '2024-06-01')


        await page.waitForTimeout(5000)


    })





    test('Advanced Wait commands', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('wait-navigation-link').click()

        // await page.waitForURL('https://playwright-mastery-academy-app.vercel.app/practice/popup?source=waitfornavigation')

        // await expect(page.getByText('Popup Opened Successfully')).toBeVisible()


        // await page.getByTestId('wait-response-btn').click()

        // await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/waits-status')

        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()


        // await page.getByTestId('wait-response-btn').click()

        // await page.getByText('Trigger API Response Completed').waitFor({ state: 'visible' })

        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()

        //  visible, hidden, attached, detached

        //  visible = element should be visible in UI, Exists in DOM

        // hidden = locator should not be visible in UI, exists in DOM

        // attached = DOM exists, may or may not be visible in UI

        // detached = should not be visible in UI and should not exist in DOM



         await page.getByTestId('wait-response-btn').click()

        //await page.getByText('Trigger API Response Completed').waitFor({ state: 'visible' })

        await page.waitForSelector("//*[contains(text(), 'Trigger API Response Completed')]", { state: 'visible' })

        await expect(page.getByText('Trigger API Response Completed')).toBeVisible()


        // load - DOM ready, images load - medium
        // await page.getByTestId('wait-loadstate-practice-load-btn').click()

        // await page.waitForLoadState('load')

        // await expect(page.getByText('Test load State: Completed')).toBeVisible()


        // domcontentloaded - DOM ready - fast
        // await page.getByTestId('wait-loadstate-practice-dom-btn').click()

        // await page.waitForLoadState('domcontentloaded')

        // await expect(page.getByText('Test DOMContentLoaded State: Completed')).toBeVisible()


        // networkidle - DOM ready, images load, API calls complete - slow
        await page.getByTestId('wait-loadstate-practice-networkidle-btn').click()

        await page.waitForLoadState('networkidle')

        await expect(page.getByText('Test Network Idle State: Completed')).toBeVisible()


    })



    test('Handling Mouse Actions', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('mouse-downup-target').hover()

        // await page.mouse.down()

        // await expect(page.getByText('Mouse down detected.')).toBeVisible()

        // await page.mouse.up()

        // await expect(page.getByText('Mouse down + up detected.')).toBeVisible()


        // await page.getByTestId('mouse-rightclick-target').click({button: 'right'})

        // await expect(page.getByText('Right click detected on target.')).toBeVisible()


        // await page.getByTestId('mouse-wheel-target').hover()

        // await page.mouse.wheel(0, 300)

        // await expect(page.getByText('Mouse wheel scrolled down.')).toBeVisible()



        await page.getByTestId('mouse-wheel-target').scrollIntoViewIfNeeded()

        await page.getByTestId('mouse-wheel-target').hover()

    })





    test('Force actions', async({page})=> {

        // avoid to use force actions

        // attached DOM
        // Visible
        // enabled
        // stable
        // not covered by another element

        // clicking wrong element unintentionally

        await page.getByTestId('mouse-rightclick-target').click({force: true})

        // click, dblclick, hover, check, uncheck, dragto, fill


    })



    test('element and page screenshot', async({page})=> {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('wait-response-btn').screenshot({path: 'screenshots/elemet.png'})

        await page.screenshot({path: 'screenshots/page.png', fullPage: true})

    })



    test('Advanced Assertions - retry, non retry, negating', async({page})=> {

        // retry assertion - 5 seconds

        // visiblity & state

        // expect(page.getByTestId('wait-response-btn')).toBeVisible()
        // expect(page.getByTestId('wait-response-btn')).toBeHidden()
        // expect(page.getByTestId('wait-response-btn')).toBeEnabled()
        // expect(page.getByTestId('wait-response-btn')).toBeDisabled()
        // expect(page.getByTestId('wait-response-btn')).toBeEditable()
        // expect(page.getByTestId('wait-response-btn')).toBeChecked()
        // expect(page.getByTestId('wait-response-btn')).toBeFocused()


        // text 

        // expect(page.getByTestId('wait-response-btn')).toHaveText('Wait for response')
        // expect(page.getByTestId('wait-response-btn')).toContainText('Wait for')
        // expect(page.getByTestId('wait-response-btn')).toHaveValue('Wait for response')
        // expect(page.getByTestId('wait-response-btn')).toHaveAttribute('id', 'wait-response-btn')
        // expect(page.getByTestId('wait-response-btn')).toHaveClass('active')


        // page

        // expect(page).toHaveTitle('Playwright Mastery Academy - Sandbox Advanced')
        // expect(page).toHaveURL('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')



        // non retry assertion - 0 seconds

        const num = 5

        expect(num).toBe(5)
        expect(num).toEqual('5')
        expect(num).toStrictEqual(5)
        expect(num).toBeGreaterThan(4)
        expect(num).toBeLessThan(6)
        expect(num).toBeGreaterThanOrEqual(5)
        expect(num).toBeLessThanOrEqual(5)

        expect(true).toBeTruthy()
        expect(false).toBeFalsy()
        
        expect(null).toBeNull()
        expect(undefined).toBeUndefined()
        expect('Playwright').toBeDefined()

        expect([10, 20, 30]).toContain(10)



        // negating assertion 


    expect(page.getByTestId('wait-response-btn')).not.toBeVisible()
    expect(num).not.toBe(5)

    })










})