import {test, expect} from '@playwright/test'
import testData from '../testData.json'
import fs from 'fs'
import { parse } from 'csv-parse/sync'
import XLSX from 'xlsx'

const { user1, user2 } = testData


test.describe('Data Driven Tests. ', () => {



    test('Handling Json Data', async ({ page }) => {

        // console.log(user1.username)
        // console.log(user2.username)
        // console.log(user1.password)
        // console.log(user2.password)
        // console.log(user1.expectedText)
        // console.log(user2.expectedText)

        // // login(user1.username, user1.password)


        const data = fs.readFileSync('testData.json', 'utf-8')

        console.log(data)


    })


    test('Read data from csv file', async ({ page }) => {

        const csvData = fs.readFileSync('downloads/practice-data.csv', 'utf-8')

        const data = parse(csvData, {
            columns: true
        })

        console.log(data)

    })



    test('Read data from Excel file', async ({ page }) => {

        const file = XLSX.readFile('Book1.xlsx')

        const sheet = file.Sheets['Sheet1']

        // const data = XLSX.utils.sheet_to_json(sheet)

        // console.log(data)


        const cellValue = sheet['D3']

        console.log(cellValue.v)



    })





})