import { test, expect} from '@playwright/test'


test.describe('Hooks in playwright', async()=> {

    // before all 
    // before each

    // after all
    // after each

    test.beforeAll(()=> {
        console.log('Before all executed')
    })

    test.beforeEach(()=> {
        console.log('Before each executed')
    })


    test.afterAll(()=> {
        console.log('After all executed')
    })

    test.afterEach(()=> {
        console.log('After each executed')
    })



    test('test case 1', ()=> {
        console.log('Test case 1 executed')
    })

    test('test case 2', ()=> {
        console.log('Test case 2 executed')
    })









})