import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test';

// Only for single user application

test.describe('Authentication Handling', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')
        await page.locator('[name="Password"]').fill('XlgTest-2026!')
        await page.locator('[type="submit"]').click()
        await page.waitForTimeout(10000)
        await context.storageState({path: 'storageState.json'})
        await browser.close()
    })

    test.beforeEach(async ()=> {
        browser = await chromium.launch();
        context = await browser.newContext({storageState: 'storageState.json'});
        page = await context.newPage()
        await page.goto('https://testcms.reco-claims.ca/')
    })

    test.afterEach(async () => {
        await browser.close()
    })



    test('Verify search textbox is visible', async () => {

        test.setTimeout(240000)

        await page.waitForTimeout(10000)
        await expect(page.getByPlaceholder('Search')).toBeVisible({timeout: 120000})

    })


    test('Verify Table header is visible', async () => {

        test.setTimeout(120000)
        
        await page.waitForTimeout(10000)
        await expect(page.locator('thead')).toBeVisible()

    })


    test('Verify claim button is visible', async () => {

        test.setTimeout(120000)

        await page.waitForTimeout(10000)
        await expect(page.getByRole('button').getByText('New Claim')).toBeVisible()


    })







})