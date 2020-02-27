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

export const signin = async (args: obj) => {
	const body = args;
    try { 
        const user = await db.query(sql`Select password,isadmin from users where email=${body.email}`)
        const compare = await bcrypt.compare(body.password, user[0].password)
        
        if (!compare ||user.length === 0) {
            return {error:"did you mispell password or email?"};
        }
        const token = jsonwebtoken.sign({ token: body.email }, process.env.JWTTOKEN as string)
        return {token:token,admin:user[0].isadmin}
    } catch (error) {
        console.log("error")
        //after am done, if any error occurs, send mismatch in usname or pass
        return {error:"did you forget your email?"}
    }
};

export const register = async (args: obj) => {
    const body = args;
	// const {error} = signIn.validate(body)
    try {
        const Created = new Date().toISOString()
        const Updated = new Date().toISOString()
        const checkUser = await db.query(sql`Select email from users where email = ${body.email}`);
        console.log(checkUser)
        if (checkUser.length > 0) {
            return {error: "sorry this account already exist!"}
        }
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(body.password, salt);
        db.query(sql`Insert into Users values (uuid_generate_v4(),
        ${body.username}, ${body.firstname}, ${body.lastname},
        ${body.email},${hash}, ${body.phone}, ${body.admin ?? true}, 
        ${Created},${Updated})`);
        const token = jsonwebtoken.sign({ token: body.email }, process.env.JWTTOKEN as string)
        return { token: token,admin:body.admin}
        //after registering, send a mail to user, requesting approval
    } catch (error) {
        return {error:error.message}
    }
};

export const profile = async (token: string) => {
    console.log("entered")
    if (!token) {
         return {error:"network error, please try again"}
    };
    try {   
        const user = await db.query(sql`Select * from users where email = ${token}`)
        return {payload:user}
    } catch (error) {
        console.log(error.message)
       return {error:"network error, please try again"} 
    }
};


export const history = async (token: string) => {
    if (!token) {
         return {error:"network error, please try again"}
    };
    try {
        const hist = await db.query(sql`Select items.item, items.price, 
                                        history.date_bought, items.supplier
                                        From items Inner Join history on
                                        items.id = history.items_id
                                        Where history.user_id=${token}`)
        return {payload:hist}
    } catch (error) {
        return {error:error.message}
    }
};

//add history happens when the user makes a purchase
export const addhistory = async (token:string,args:obj)=>{
    if (!token) {
        return {error:"network error, please try again"}
   };
   const now = new Date().toISOString();
   try {
       const add = await db.query(sql`insert into history Values (uuid_generate_v4(),
                    ${args.itemid},${args.userid},${args.bougth},${args.quantity},
                    ${args.delivered},${now},) Returning *`)
        return {payload:add}
   } catch (error) {
       console.log(error.messsage);
       return {error:error.message}
   }
}

export const category = async (token:string,cat:string) => {
     if (!token) {
         return {error:"network error, please try again"}
    };
    try {
        const categories = await db.query(sql`
        Select category from items
        `)
        return {payload:categories}
    } catch (error) {
        return {error:error.message}
    }
}

//add category haapens when the admin is about to add category
export const addcategory = async (token: string, args: obj) => {
    console.log("hello")
     if (!token) {
         return {error:"network error, please try again"}
    };
    //remember to use joi for validation
    const now = new Date().toISOString();
    try {
        console.log('entering')
        const update = await db.query(sql`Insert into category values(uuid_generate_v4(),
                        ${args.categoryname},${args.categoryimage},
                        ${now},${now}) Returning *`)
        return {payload:update}
    } catch (error) {
        console.log(error.message)
        return {error:error.message}
    }
}


//front end talk
//for search, create a small component below the search icons, it would fetch data
//and rerender itself on every search input
//items table is the key here,
//e suppose get everything from 
export const items = async (token: string, id: string) => {
    if (!token) {
        return {error:"network error, please try again"}
    }
    try {
        const item = await db.query(sql`Select * from items where id=${id}`)
        console.log(item);
        return {payload:item}
    } catch (error) {
        console.log(error.message);
        return {error:error.message}
    }
}; 

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
