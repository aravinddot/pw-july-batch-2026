import {test, expect} from '@playwright/test';
import { pool } from '../db.utils';
import query from '../query.json';

const { selectProduct } = query;


async function getQueryValues(query: string) {
    const result = await pool.query(query)
    return result.rows
}


test('get values from db', async()=> {


    const rows = await getQueryValues(selectProduct)

  

    // console.log(result.rowCount)

    // console.log(rows)

    for(const row of rows) {
        console.log(row.product_name)

        if(row.product_name == 'Blue Top') {
            expect(row.product_name).toBe('Blue Top')
        }
    }


})