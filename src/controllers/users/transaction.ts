import {db,sql} from '../../models/pg-model'
import { ITEMS } from '../../lib/type';


type History = Pick<ITEMS, 'id' | 'itemname'>

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
export const addhistory = async (token:string,arg:{[key:string]:string}[])=>{
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
