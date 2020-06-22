import express, { Response, Request } from 'express';

import authenticate, {user} from '../authenticate/authenticate'
import {
    home,
    Search,
} from '../controllers/users/users'
import { upload } from '../app';


const router = express.Router();
// the site is where people sell just traditional clothes

router.get('/' ,async (req:(user & Request),res:Response)=>{
    console.log(__dirname)
    res.sendFile(__dirname,'userRoutes.ts')
    const person:any = await home(req?.user as string)
    console.log("coming")
    return person.payload ?
        res.status(200).json(person):
        res.status(404).json(person)
})


router.post('/upload',async (req:Request, res:Response) => {
   return  upload(req,res,(err)=>{
       console.log("whatdsap")
        if(err){ 
            console.log(err)
            return res.status(500).send("error no pic")
        }
        console.log(req.file)
        return res.status(200).send("thank you")
    })
})
// router.get('/profile',authenticate, async (req:(user & Request), res:Response) => {
//     console.log("here its user",req?.user as string)
//     const person = await profile(req?.user as string)
//     return person.payload ?
//         res.status(200).json(person) :
//         res.status(404).json(person)
//  })
// router.get('cart', cart)

router.get('/search/:id', authenticate, async (req: (user & Request), res: Response) => {
    console.log("searching ....")
const person = await Search(req?.user as string,req.params['id'])
    return person?.search ?
        res.status(200).json(person) :
        res.status(404).json(person)
})


export default router;