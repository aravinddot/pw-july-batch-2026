import { test, expect } from '@playwright/test'

import { performance } from 'node:perf_hooks'


test.describe('API Tests', () => {


    test('Get Method', async ({ request }) => {


        const response = await request.get('http://localhost:3000/products')


        const body = await response.json()

        //console.log(body)

        expect(response.status()).toBe(200)

        expect(response.statusText()).toBe('OK')

        expect(body[0].name).toBe('Blue Top')


        expect(body[0].name).toBeDefined()

        expect(body[0].name.length).toBeGreaterThan(0)


        expect(['Blue Top', 'Men Tshirt']).toContain(body[1].name)



        for (const item of body) {
            console.log(item.name)
        }

    })






    test('POST Method', async ({ request }) => {


        const startTime = performance.now()

        const response = await request.post('http://localhost:3000/products', {
            data: {
                name: "POST NAME",
                price: "Rs. 1500",
                brand: "POST BRAND",
                category: {
                    usertype: {
                        usertype: "POST USERTYPE"
                    },
                    category: "POST CATEGORY"
                }
            },
        })

        const endTime = performance.now() - startTime

        console.log(endTime)

        const body = await response.json()

        expect(response.status()).toBe(201)
        expect(response.statusText()).toBe('Created')

        expect(body.name).toBe('POST NAME')

        expect(endTime).toBeLessThan(1000) // Expect the request to complete within 1 second

    })


    // 1 lac - 10000 - data


    // 1 lac - 20000 - data


    test('PUT Method', async ({ request }) => {


        const response = await request.put('http://localhost:3000/products/6', {
            data: {
                name: "PUT NAME",
                price: "Rs. 2500",
                brand: "PUT BRAND",
                category: {
                    usertype: {
                        usertype: "PUT USERTYPE"
                    },
                    category: "PUT CATEGORY"
                },

            }
        }
        )

        const body = await response.json()

        console.log(body)

        expect(response.status()).toBe(200)

        expect(response.statusText()).toBe('OK')



    })






    test('PATCH Method', async ({ request }) => {


        const response = await request.patch('http://localhost:3000/products/6', {
            data: {
                price: "Rs. 20500",

            }
        }
        )

        const body = await response.json()

        console.log(body)

        expect(response.status()).toBe(200)

        expect(response.statusText()).toBe('OK')



    })


    test('DELETE Method', async ({ request }) => {


         const response = await request.delete('http://localhost:3000/products/6')

         const body = await response.json()

        console.log(body)

        expect(response.status()).toBe(200)

        expect(response.statusText()).toBe('OK')


    })


})





