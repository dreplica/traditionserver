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
        return {error:"did you mispell password or email?"}
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

export const itemstype = async (token: string,params:{[key:string]:string}) => {
    console.log("entered")
    if (!token) {
         return {error:"network error, please try again"}
    };
    if(params['category']){
        try {
            const type = params['type']
            const cat = params['category']
            const items = await db.query(sql`Select * from items Where category =${cat} And type=${type}`);
            console.log(items)
            return {payload:items}
        } catch (error) {
            return {error:error.message}
        }
    }
};


export const history = async (token: string) => {
    if (!token) {
         return {error:"network error, please try again"}
    };
    try {
        const userid = await db.query(sql` select id from users where email=${token}`)
        const hist = await db.query(sql`Select items.itemname,items.id, items.price, 
                                        history.bought, items.sellerid, history.created
                                        From items Inner Join history on
                                        items.id = history.itemid
                                        Where history.userid=${userid[0]['id']}`)

        return {payload:hist}
    } catch (error) {
        return {error:error.message}
    }
};

//add history happens when the user makes a purchase
export const addhistory = async (token:string,arg:obj[])=>{
    if (!token) {
        return {error:"network error, please try again"}
   };
   const now = new Date().toISOString();
   try {
       const user = await db.query(sql`select id from users where email=${token}`)
       const add =  await arg.map(async (item)=>db.query(sql`insert into history Values(uuid_generate_v4(),
                    ${item.id},${user[0].id},${item?.bougth ?? "no"},${0},
                    ${item.delivered ?? "not yet"},${now}) returning *`)
       )
        return {payload:add}
   } catch (error) {
       return {error:error.message}
   }
}



//add category haapens when the admin is about to add category



//front end talk
//for search, create a small component below the search icons, it would fetch data
//and rerender itself on every search input
//items table is the key here,
//e suppose get everything from 
export const items = async (token: string) => {
    if (!token) {
        return {error:"network error, please try again"}
    }
    try {
        const item = await db.query(sql`Select * from items`)
        console.log(item);
        return {payload:item}
    } catch (error) {
        console.log(error.message);
        return {error:error.message}
    }
}; 
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
            ${args.itemname},${args.type},${args.category},${args.price},${args.description},
            ${args.quantity},${userId[0].id},${args.image},
            ${now},${now}) returning *`)
        return {payload:item}
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