import { test, expect } from '@playwright/test'


test.describe('Sanbox Basic Test cases', () => {



    test('Click, Double Click, Hover, Tooltip, Static Dropdown', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('single-click-btn').click()

        await expect(page.getByText('Single click completed.')).toBeVisible()

        await expect(page.getByTestId('single-click-status')).toContainText('Single click completed playwright.')

        await page.getByTestId('double-click-btn').dblclick()

        await expect(page.getByText('Double click completed.')).toBeVisible()

        await page.getByTestId('hover-btn').hover()

        await expect(page.getByText('Hover triggered successfully.')).toBeVisible()


        await page.getByTestId('tooltip-trigger-btn').hover()

        await expect(page.getByTestId('hover-tooltip')).toContainText('Tooltip verified')


        await page.getByTestId('static-practice-select').selectOption('Easy - Basic locator targeting')

        await expect(page.getByText('Static dropdown selected: Easy.')).toBeVisible()


    })


    test('Inputs, Checkbox, Radio, Dropdown', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('name-input').fill('Playwright')

        await page.getByTestId('email-input').type('playwright@gmail.com')

        await page.getByTestId('track-select').selectOption('Playwright Core')

        await page.getByTestId('remember-checkbox').check() // uncheck() to uncheck the checkbox

        await page.getByTestId('mode-api-radio').check()

        await page.getByTestId('submit-form-btn').click()

        await expect(page.getByText('Playwright submitted (playwright@gmail.com) for Playwright Core.')).toBeVisible()

    })



    test('Static Waits, Keyboard', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('async-load-btn').click()

        await page.waitForTimeout(20000)

        await expect(page.getByText('Async result loaded successfully.')).toBeVisible()


        await page.getByTestId('keyboard-input').fill('playwright')

        await page.getByTestId('keyboard-input').press('Enter')

        // Tab, Escape, Baskspace, Delete, Arrowup, ArrowDown, ArrowRight, ArrowLeft, Space,
        // A to Z, 1 to 0
        // Control+C, Control+V

        await expect(page.getByText('Command submitted: playwright')).toBeVisible()

    })



    test('Text and Attribute Extraction', async ({ page }) => {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        const innerTextValue = await page.getByTestId('extract-textcontent-target').innerText()

        console.log("innerTextValue===>"+ innerTextValue)


        const textContentValue = await page.getByTestId('extract-textcontent-target').textContent()

        console.log("textContentValue===>"+ textContentValue)


        const value = await page.getByTestId('extract-inputvalue-target').inputValue()

        console.log("value===>"+ value)

        const attr = await page.getByTestId('extract-attribute-target').getAttribute('class')

        console.log("attr===>"+ attr)


        const allInnerTexts = await page.getByTestId('extract-list').allInnerTexts()

        console.log("allInnerTexts===>"+ allInnerTexts)

         const allTextContents = await page.getByTestId('extract-list').allTextContents()
        
        console.log("allTextContents===>"+ allTextContents)


        const innerHTML = await page.getByTestId('extract-list').innerHTML()

        console.log("innerHTML===>"+ innerHTML)


    })



    test('Conditional Handling - isChecked, isEditable', async({page})=> {



        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')


        const isChecked = await page.getByTestId('remember-checkbox').isChecked()

        console.log("isChecked===>"+ isChecked)

        if(isChecked === false){

            await page.getByTestId('remember-checkbox').check()
        }

        await page.waitForTimeout(3000)


        const isEditable = await page.getByTestId('name-input').isEditable()

        console.log("isEditable===>"+ isEditable)

    })



    test('Conditional Handling - isVisible, isHidden, isDisabled', async({page})=> {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const isDisabled = await page.getByTestId('dynamic-option-select').isDisabled()
        
        console.log("isDisabled===>"+ isDisabled)


        const isHidden = await page.getByTestId('hidden-dropdown-select').isHidden()

        console.log("isHidden===>"+ isHidden)

        if(isHidden === true){
            await page.getByTestId('hidden-dropdown-toggle-btn').click()
        }


        const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible()
        
        console.log("isVisible===>"+ isVisible)


    })

























})