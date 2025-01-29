import app from "./App"
import {ErrorMiddleware} from './middlewares/error.middleware'
const PORT = process.env.PORT || 3000


app.use(ErrorMiddleware)
app.listen(3000,()=>{
    console.log("Servidor encendido en el puerto", PORT);
    
})


