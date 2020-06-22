<<<<<<< HEAD
import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from "dotenv"
import { db, sql } from '../../models/pg-model';
import bcrypt from 'bcryptjs';

dotenv.config()

// the site is where people sell just traditional clothes
interface obj {
    [key:string]:string
}

=======
import { db, sql } from '../../models/pg-model';

// the site is where people sell just traditional clothes
>>>>>>> 2e3cf9387ab7f814eec387698bcbc1a01fb7b381
export const home = async (token: string) => {
    if (!token) {
        console.log("no token")
        return {error:"network error, please try again"}
    }
    try {
        const items = db.query(sql`Select * From items`)
        return {payload:items}
    } catch (error) {
        console.log(error.message)
        return {error:"netork error, please try again"}
    }
};



//add category haapens when the admin is about to add category



//front end talk
//for search, create a small component below the search icons, it would fetch data
//and rerender itself on every search input
//items table is the key here,
//e suppose get everything from 
<<<<<<< HEAD
export const items = async (token: string, id: string) => {
=======

export const getSearchItem = async (token: string,args:string) => {
>>>>>>> 2e3cf9387ab7f814eec387698bcbc1a01fb7b381
    if (!token) {
        return {error:"network error, please try again"}
    }
    try {
<<<<<<< HEAD
        const item = await db.query(sql`Select * from items where id=${id}`)
        console.log(item);
        return {payload:item}
=======
        const item = await db.query(sql`Select * from items where id=${args}`)
        console.log(item);
        return {search:item}
>>>>>>> 2e3cf9387ab7f814eec387698bcbc1a01fb7b381
    } catch (error) {
        console.log(error.message);
        return {error:error.message}
    }
}; 

<<<<<<< HEAD
//happens when the dmin adds an item
export const additems = async (token: string, args: obj) => {
    if (!token) {
        return {error:"network error, please try again"}
    }
    const now = new Date().toISOString();
    try {
        console.log("started adding")
        const userId:Array<obj> = await db.query(sql`Select id from users where email=${token}`) as any

        const item = await db.query(sql`Insert Into items Values (uuid_generate_v4(),
            ${args.name},${args.type},${args.category},${args.price},${args.description},
            ${args.quantity},${userId[0].id},${args.image},
            ${now},${now}) returning *`)
        return {payload:item}
    } catch (error) {
        console.log(error.message);
        return {error:error.message}
    }
};
=======

export const Search = async (token:string,args:string) =>{
    if(!token){
        return {error:'network error please try again'}
    }
    try {
        console.log(args)
        const search = await db.query(sql`select * from items where lower(itemname) like ${'%'+args+'%'}`)
        console.log(search)
        return {search:search} 
        
    } catch (error) {
        return {error:error.message}
    }
}
>>>>>>> 2e3cf9387ab7f814eec387698bcbc1a01fb7b381
