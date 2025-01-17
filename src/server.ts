import app from "./App"
const PORT = process.env.PORT || 3000





app.listen(3000,()=>{
    console.log("Servidor encendido en el puerto", PORT);
    
})


