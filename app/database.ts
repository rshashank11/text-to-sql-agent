"use server";

import  sqlite3  from "sqlite3";
import { filmTable, customerTable, rentalTable, paymentTable, insertIntoCustomerTable, insertIntoFilmTable, insertIntoPaymentTable, insertIntoRentalTable } from "./constant";

// db stores the database
// :memory: means to tell SQLite to keep everything in memory (RAM)
// gets erased when program stops
const db = new sqlite3.Database('":memory:"');

export async function seed() {
    db.serialize(() => {
        db.run(filmTable)
        db.run(customerTable)
        db.run(rentalTable)
        db.run(paymentTable)
    })

    db.run(insertIntoFilmTable)
    db.run(insertIntoCustomerTable)
    db.run(insertIntoRentalTable)
    db.run(insertIntoPaymentTable)

}

export async function execute(sql: string) {
    return await new Promise((resolve, reject) => {
        try {
            db.all(sql, (error, result) => {
                if(error) {
                    resolve(JSON.stringify(error))
                }

                resolve(result);
            })
        }
        catch(e) {
            console.log(e)
            reject(e)

        }
    })
}