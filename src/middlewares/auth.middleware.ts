import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import {HttpException} from 'exceptions/HttpException'

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "pass"

export function isAuthenticate(req:Request, res:Response, next:NextFunction):any{
    //Esto devuelve "bearer token.. hay que deshacerse del bearer"
    const tokenReceived = req.cookies.token
    if(!tokenReceived) throw new HttpException(404,"Token not found")

    try{
        const tokenDecodificado = jwt.verify(tokenReceived,TOKEN_PASSWORD)
        req.body.user = tokenDecodificado
        next()
    }catch(error){
        next(error)
    }
}


export function isAdmin(req:Request, res:Response, next:NextFunction):any{
    try{
        const user = req.body.user
        if(user.role!="admin") throw new HttpException(401,"No permission")
        next()
    }catch(e:any){
        next(e)
    }
}
