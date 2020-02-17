import express, { Response,Request } from 'express';
import {user} from '../authenticate/authenticate'
import {
    // home,
    register,
    signin,
    profile,
    cart,
    history,
    items
} from '../controllers/users/users'

const router = express.Router();

router.get('/home', async (req:(user & Request),res:Response)=>{
    // const person:any = await home(req.user)
    // return person.items ?
    console.log("this is user",req.user)
    console.log("coming")
        res.status(200).json({message:"welcome"}) //:
        // res.status(404).send(person)
})
router.post('/signup', async (req:Request, res:Response) => {
    console.log("enter")
    console.log(req.body)
    const person:any = await register(req.body)
    return person.token ?
        res.status(200).json(person) :
        res.status(404).send(person)
})

router.post('/signin', async (req:Request, res:Response) => {
    console.log("signing in")
    const person:{[key:string]:string} = await signin(req.body)
    return person?.token ?
        res.status(200).json(person) :
        res.status(404).send(person)
})
router.get('profile', async (req:(user & Request), res:Response) => {
    const person = await profile(req?.user as string)
    return person.payload ?
        res.status(200).json(person) :
        res.status(404).json(person)
 })
// router.get('cart', cart)
// router.get('history', history)
// router.get('items', items)


export default router;