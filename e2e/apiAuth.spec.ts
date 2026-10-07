import {test, expect} from '@playwright/test'




test('Handling Basic auth', async({request})=> {


    const response = await request.get('https://postman-echo.com/basic-auth', {
        headers: {
            Authorization: `Basic ${Buffer.from('postman:password').toString('base64')}`
        }
    })

console.log(await response.json())


})



test('Bearer token', async({request})=> {
    const token = process.env.GITHUB_API_TOKEN
    test.skip(!token, 'Set GITHUB_API_TOKEN to run this test')


    const res = await request.get('https://api.github.com/user/repos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })


    console.log(await res.json())



})





test('API Key', async({request})=> {
    const apiKey = process.env.OPENWEATHER_API_KEY
    test.skip(!apiKey, 'Set OPENWEATHER_API_KEY to run this test')


    const res = await request.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: 'chennai',
            appid: apiKey!
        }
    })


    console.log(await res.json())



})