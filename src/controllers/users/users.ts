import { db, sql } from '../../models/pg-model';

// the site is where people sell just traditional clothes
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

export const getSearchItem = async (token: string,args:string) => {
    if (!token) {
        return {error:"network error, please try again"}
    }
    try {
        const item = await db.query(sql`Select * from items where id=${args}`)
        console.log(item);
        return {search:item}
    } catch (error) {
        console.log(error.message);
        return {error:error.message}
    }
}; 


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