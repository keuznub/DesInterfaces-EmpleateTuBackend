import {Response, Request} from "express"
import {UserService} from '@services/user.service'

export class UserController{

    static async profile(req:Request,res:Response){
        try{
            const {email} = req.body.user
            console.log(req.body);
            const user = await UserService.getByEmail(email)
            res.status(201).json({message:"Has conseguido entrar al perfil", user:user})

        }catch(e:any){

            res.status(409).json({message:"No tienes permisos para entrar en perfil", Error:e.message})

        }
    }

    static async allUsers(req:Request,res:Response){
        try{
            const {role} = req.body.user
            const users = await UserService.getAllUsers()
            res.status(201).json({message:"Tienes permisos para ver todos los usuarios", Usuarios:users})
        }catch(e:any){

            res.status(409).json({message:"No tienes permisos ver los usuarios", Error:e.message})

        }
    }
}


