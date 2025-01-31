import express, {Response, Request} from "express"
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import offertRouter from './routes/offert.routes'
import cors from 'cors'
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import compression from "compression"
import cookieParser from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(cookieParser())
const limiter = rateLimit({
    max:100,
    windowMs: 1000*15*60//15minutos
})
app.use(limiter)
app.use(cors({
    origin: '*',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.get("/", (req:Request,res:Response)=>{
    res.send('Bienvenido')
})

app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/offers',offertRouter)
app.use('/api/categories',offertRouter)


export default app
