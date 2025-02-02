
import {Response, Request, NextFunction} from "express"
import { PrismaClient } from "prisma/prisma-client"
import { OfferService } from '../services/offer.service'
import { off } from "process"
import { HttpException } from "../exceptions/HttpException"
const prisma = new PrismaClient()

export class OffertController{

    static async getById(req:Request,res:Response, next:NextFunction){
        try{
            const id = req.params.id
            if(typeof id!="number") throw new HttpException(400,"Param error")
            const offer = OfferService.getById(id)
            res.status(200).json(offer)
        }catch(error){
            next(error)
        }
    }

    static async getAll(req:Request,res:Response, next:NextFunction){
        try{
            const offers = OfferService.getAll()
            res.status(200).json(offers)
        }catch(error){
            next(error)
        }
    }

    static async save(req:Request,res:Response, next:NextFunction){
        try{
            
            const offer = req.body.offer
            const saveResult = OfferService.save(offer)
            res.status(200).json(saveResult)
        }catch(error){

            next(error)

        }
    }

    static async update(req:Request,res:Response, next:NextFunction){
        try{
            const offer = req.body.offer
            const id = req.params.id
            if(typeof id!="number") throw new HttpException(400,"Param error")
            const updateResult = OfferService.update(id,offer)
            res.status(200).json(updateResult)

        }catch(error){

            next(error)

        }
    }

    static async delete(req:Request,res:Response, next:NextFunction){
        try{
            const id = req.params.id
            if(typeof id!="number") throw new HttpException(400,"Param error")
            const deleteResult = OfferService.delete(id)
            res.status(200).json(deleteResult)

        }catch(error){

            next(error)

        }
    }


 
}


