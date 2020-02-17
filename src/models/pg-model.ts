import connect,{sql } from '@databases/pg';
import dotenv from 'dotenv'
dotenv.config()

const db = connect();

const authenticate_db = () => {
    console.log("starting database");
    db.query(sql`Select 1=1;`);
    console.log("database connected")
}

export {db,sql,authenticate_db}