import {Response, Request, NextFunction} from "express"
import {UserService} from '../services/user.service'

export class UserController{

    static async profile(req:Request,res:Response, next:NextFunction){
        try{
            const {email} = req.body.user
            console.log(req.body);
            const user = await UserService.getByEmail(email)
            res.status(201).json({message:"Has conseguido entrar al perfil", user:user})

        }catch(error){

            next(error)

        }
    }

    static async allUsers(req:Request,res:Response, next:NextFunction){
        try{
            const {role} = req.body.user
            const users = await UserService.getAllUsers()
            res.status(201).json({message:"Tienes permisos para ver todos los usuarios", Usuarios:users})
        }catch(error){

            next(error)

        }
    }
}


