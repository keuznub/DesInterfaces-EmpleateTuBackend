import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import {HttpException} from 'exceptions/HttpException'

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "pass"

export function isAuthenticate(req:Request, res:Response, next:NextFunction):any{
    //Esto devuelve "bearer token.. hay que deshacerse del bearer"
    const tokenReceived = req.cookies.token
    if(!tokenReceived) return res.status(401).json({error:"Access Denied"})

    try{
        const tokenDecodificado = jwt.verify(tokenReceived,TOKEN_PASSWORD)
        req.body.user = tokenDecodificado
        next()
    }catch{
        res.status(401).json({error:"Invalid token"})
    }
}


export function isAdmin(req:Request, res:Response, next:NextFunction):any{
    try{
        const user = req.body.user
        if(user.role!="admin") throw new HttpException(401,"No permission")
        next()
    }catch(e:any){
        res.status(401).json({error:"Invalid token", message:e})
    }
}


export function isValidLogin(req:Request, res:Response, next:NextFunction):any{
    try{
        const {email, password} = req.body
        const regex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(!email.match(regex)) throw new HttpException(401,"Invalid email")
        if(password.lenght<4) throw new HttpException(401,"Invalid password")
        next()

    }catch(e:any){
        res.status(401).json({error:e.message})
    }
}