import express, { Response,Request, NextFunction } from 'express';
import authenticate, {user} from '../authenticate/authenticate'
import path from 'path'
import {
    home,
    register,
    signin,
    profile,
    history,
    items,
    category,
    addcategory,
    addhistory,
    additems
} from '../controllers/users/users'
import { upload } from '../app';


const router = express.Router();
// the site is where people sell just traditional clothes

router.get('/home' ,async (req:(user & Request),res:Response)=>{
    console.log(__dirname)
    res.sendFile(__dirname,'userRoutes.ts')
    const person:any = await home(req?.user as string)
    console.log("coming")
    return person.payload ?
        res.status(200).json(person):
        res.status(404).json(person)
})
router.post('/signup', async (req:Request, res:Response) => {
    console.log("enter")
    console.log(req.body)
    const person:any = await register(req.body)
    console.log(person)
    return person.token ?
        res.status(200).json(person) :
        res.status(404).json(person)
})

router.post('/signin', async (req:Request, res:Response) => {
    console.log("signing in")
    const person:{[key:string]:string|undefined} = await signin(req.body)
    return person?.token ? 
        res.status(200).json(person) :
        res.status(404).json(person)
})
router.post('/upload',async (req:Request, res:Response) => {
   return  upload(req,res,(err)=>{
       console.log("whatdsap")
        if(err){
            
            console.log(err)
            return res.status(500).send("error no pic")
        }
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
router.get('/history', authenticate, async (req: (user & Request), res: Response) => {
    const person = await history(req?.user as string)
    return person.payload ?
        res.status(200).json(person) :
        res.status(404).json(person)
})
router.get('/items/:category/:type',authenticate, async (req: (user & Request), res: Response) => {
const person = await items(req?.user as string,req.params)
    return person?.payload ?
        res.status(200).json(person?.payload) :
        res.status(404).json(person)
})

// router.get('/category/:cat', authenticate, async (req: (user & Request), res: Response) => {
// //onclicking it would take you to that particular category and its items
// const person = await category(req?.user as string,req.params?.cat)
//     return person?.payload ?
//         res.status(200).json(person) :
//         res.status(404).json(person)
// })
router.post('/category', authenticate, async (req: (user & Request), res: Response) => {
const person = await addcategory(req?.user as string,req.body)
    return person?.payload ?
        res.status(200).json(person) :
        res.status(404).json(person)
})
router.post('/items',authenticate, async (req: (user & Request), res: Response) => {
    console.log(req.body)
const person = await additems(req?.user as string,req.body)
    return person?.payload ?
        res.status(200).json(person) :
        res.status(404).json(person)
})
router.post('/history', authenticate, async (req: (user & Request), res: Response) => {
const person = await addhistory(req?.user as string,req.body)
    return person?.payload ?
        res.status(200).json(person) :
        res.status(404).json(person)
})
// router.get('items', items)+


export default router;