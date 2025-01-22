import express, {Response, Request} from "express"
import authRouter from './routes/auth.routes'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.get("/", (req:Request,res:Response)=>{
    res.send('Bienvenido')
})

app.use('/api/auth',authRouter)


export default app
