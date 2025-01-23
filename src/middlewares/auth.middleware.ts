import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const TOKKEN_PASSWORD = process.env.TOKKEN_PASSWORD || "pass"

export function isAuthenticate(req:Request, res:Response, next:NextFunction):any{
    //Esto devuelve "bearer tokken.. hay que deshacerse del bearer"
    const tokkenReceived = req.headers.authorization?.split(" ")[1]
    if(!tokkenReceived) return res.status(401).json({error:"Access Denied"})

    try{
        const tokkenDecodificado = jwt.verify(tokkenReceived,TOKKEN_PASSWORD)
        req.body.user = tokkenDecodificado
        next()
    }catch{
        res.status(401).json({error:"Invalid tokken"})
    }
}


export function isAdmin(req:Request, res:Response, next:NextFunction):any{
    //Esto devuelve "bearer tokken.. hay que deshacerse del bearer"
    const tokkenReceived = req.headers.authorization?.split(" ")[1]
    if(!tokkenReceived) return res.status(401).json({error:"Access Denied"})

    try{
        const tokkenDecodificado = jwt.verify(tokkenReceived,TOKKEN_PASSWORD)
        req.body.user = tokkenDecodificado
        const user = req.body.user
        console.log(user);
        if(user.role!="admin") throw new Error("No permission")
        next()
    }catch(e:any){
        res.status(401).json({error:"Invalid tokken", message:e})
    }
}