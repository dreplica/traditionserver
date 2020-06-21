import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken'

import {db,sql} from '../../models/pg-model'
import { SIGNUP, SIGNIN } from './../../lib/type';



export const signin = async (body: SIGNIN) => {
    try { 
        const [user] = await db.query(sql`SELECT password,isadmin FROM users WHERE email=${body.email}`)
        const compare = await bcrypt.compare(body.password, user.password)

        if (!compare || user.length === 0) {
            return {error:"did you mispell password or email?"};
        }
        const token = jsonwebtoken.sign({ token: body.email }, process.env.JWTTOKEN as string)
        return { token: token, admin: user.isadmin }
        
    } catch (error) {
        console.log("error")
        //after am done, if any error occurs, send mismatch in usname or pass
        return {error:"did you mispell password or email?"}
    }
};

export const register = async (body: SIGNUP) => {
	// const {error} = signIn.validate(body)
    try {
        const Created = new Date().toISOString()
        const Updated = new Date().toISOString()

        const checkUser = await db.query(sql`Select email from users where email = ${body.email}`);
        
        if (checkUser.length > 0) {
            return {error: "sorry this account already exist!"}
        }

		const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password, salt);
        
       const [user] = await db.query(sql`Insert into Users values (uuid_generate_v4(),
        ${body.username}, ${body.firstname}, ${body.lastname},
        ${body.email},${hash}, ${body.phone}, ${body.isadmin ?? true}) returning id`);

        if (body.isadmin) {
           await db.query(sql`INSERT INTO seller VALUES (uuid_generate_v4(),
            ${user.id}, ${body.companyname},${body.companydesc},
            ${body.logo},${body.facebook},${body.twitter},${body.instagram})`)
        }

        const token = jsonwebtoken.sign({ token: body.email }, process.env.JWTTOKEN as string)
        return { token: token,admin:body.isadmin}
        //after registering, send a mail to user, requesting approval
    } catch (error) {
        return {error:error.message}
    }
};