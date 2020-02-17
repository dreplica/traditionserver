import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from "dotenv"
import { db, sql } from '../../models/pg-model';
import bcrypt from 'bcryptjs';

dotenv.config()

// export const home = async (id: string) => {
// 	const _id = id;
// };

export const signin = async (args: { [key: string]: string }) => {
	const body = args;
    // const {error} = register.validate(body)
    console.log("entered")
    try { 

        const user = await db.query(sql`Select password from users where email=${body.email}`)
        console.log("jaming",user)
        const compare = await bcrypt.compare(body.password, user[0].password)
        console.log(await compare)
        if (!compare || user.length === 0) {
            return "mismatch in password and email";
        }
        const token = jsonwebtoken.sign({ token: body.email }, process.env.JWTTOKEN as string)
        return {token:token}
    } catch (error) {
        console.log("error")
        //after am done, if any error occurs, send mismatch in usname or pass
        return error.message
    }
};

export const register = async (args: { [key: string]: any }) => {
    console.log("enter")
    const body = args;
    console.log(body)
    const admin = "false"
	// const {error} = signIn.validate(body)
    try {
        const Created = new Date().toISOString()
        const Updated = new Date().toISOString()
        const checkUser = await db.query(sql`Select email from users where email = ${body.email}`);
        if (checkUser.length > 0) {
            return "sorry this account already exist"
        }
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(body.password, salt);
        db.query(sql`Insert into Users values (uuid_generate_v4(),
        ${body.username}, ${body.firstname}, ${body.lastname},
        ${body.email},${hash}, ${body.phone}, ${admin}, 
        ${Created},${Updated})`);
        const token = jsonwebtoken.sign({ token: body.email }, process.env.JWTTOKEN as string)
        return { token: token }
        //after registering, send a mail to user, requesting approval
    } catch (error) {
        return error.message
    }
};

export const profile = async (token:string) => {
    if (!token) {
         return {error:"network error, please try again"}
    };
    try {   
        const user = await db.query(sql`Select * from users where email = ${token} Returning *`)
        return {payload:user}
    } catch (error) {
        console.log(error.message)
       return {error:"network error, please try again"} 
    }
};

export const cart = async (token:string) => {
    
};

export const history = async (req: Request, res: Response) => {};

export const items = async (req: Request, res: Response) => {};
