import express, {Response, Request} from "express"
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.get("/", (req:Request,res:Response)=>{
    res.send('Bienvenido')
})

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


export default app
