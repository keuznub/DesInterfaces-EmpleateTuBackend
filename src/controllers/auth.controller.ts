import { HttpException } from "@/exceptions/HttpException";
import { AuthService } from "../services/auth.service";
import {Response, Request, NextFunction} from "express"


export class AuthController{

    static async login(req:Request,res:Response, next:NextFunction){
        try{
            const userData = req.body
            //TODO validar body
            const token = await AuthService.login(userData)
            //TODO inyectar cookie en cliente
            res.cookie('token', token, {
                maxAge:60*60*1000, //1h de caducidad
                httpOnly:true, //Asi no se puede modificar con js
                //secure:true, //Solo se envia si usas https
                sameSite:"strict" //Solo valida si viene del mismo alojamiento front-back, evita ataques CSRF
            })
            res.status(201).json({message:"user login succesfully", token})
        }catch(error){
            next(error)
        }

    }

    static async register(req:Request,res:Response, next:NextFunction){
        try{
            const userData = req.body
            console.log(userData)
            const newUser = await AuthService.register(userData)
            res.status(201).json({message:"user register succesfully", newuser:newUser})
        }catch(error){
            next(error)
        }
        
    }

 
}


