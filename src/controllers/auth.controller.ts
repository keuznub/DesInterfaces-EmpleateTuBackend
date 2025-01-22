import { AuthService } from "../services/auth.service";
import {Response, Request} from "express"


export class AuthController{

    static async login(req:Request,res:Response){
        try{
            const userData = req.body
            //TODO validar body
            const token = await AuthService.login(userData)
            //TODO inyectar cookie en cliente
            res.status(201).json({message:"user login succesfully", token})
        }catch(e:any){
            res.status(409).json({message:"Fallo al logearse", Error:e.message})
        }

    }

    static async register(req:Request,res:Response){
        try{
            const userData = req.body
            console.log(userData)
            const newUser = await AuthService.register(userData)
            res.status(201).json({message:"user register succesfully", newuser:newUser})
        }catch(e:any){
            res.status(409).json({message:"Fallo al registrar al usuario", Error:e.message})
        }
        
        
    }
}


