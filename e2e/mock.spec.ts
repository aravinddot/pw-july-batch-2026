

import { test, expect } from '@playwright/test'


test('Mock api response', async ({ page }) => {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/network-mocking')


    await page.route('https://playwright-mastery-academy-app.vercel.app/api/practice/network/flags', async (route) => {

        await route.fulfill({
            body: JSON.stringify({
                source: "MOCKED-api",
                delayMs: 1043,
                flags: {
                    betaDashboard: "beta dashboard mocked",
                    aiInsights: false,
                    mcpAssist: "mocked pilot-mode",
                    smartRetries: true
                },
                message: "Feature flags loaded from endpoint."
            })
        })
    })

    await page.getByTestId('net-flags-btn').click()

    await page.waitForTimeout(5000)

})




test('Mock api headers', async ({ page }) => {


await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/network-mocking')

await page.route('https://playwright-mastery-academy-app.vercel.app/api/practice/network/profile', async(route)=> {

    const headers = {
        ...route.request().headers(),
        "x-intercept-source": "Mocked Headers"
    }
    await route.continue({ headers})


})

await page.getByTestId('net-continue-btn').click()

await page.waitForTimeout(5000)





})






test('Abort api request', async ({ page }) => {

await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/network-mocking')

await page.route('https://playwright-mastery-academy-app.vercel.app/api/practice/network/orders', async(route)=> {
    await route.abort()
})

await page.getByTestId('net-orders-btn').click()
await page.waitForTimeout(5000)





})