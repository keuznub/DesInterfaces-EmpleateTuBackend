import { Offer, PrismaClient, User } from "prisma/prisma-client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { HttpException } from "../exceptions/HttpException";

const prisma = new PrismaClient()
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "pass"

export class OfferService {

    static async getById(id: number) {
        const findOffer = await prisma.offer.findUnique({ where: { id:id } })
        if (!findOffer) throw new HttpException(404,"Offer not found")
        return findOffer
    }

    static async getAll() {
        const findOffers = await prisma.offer.findMany()
        if (!findOffers) throw new HttpException(404,"Offers not found")
        return findOffers
    }

    static async save(offer: Offer){
        return await prisma.offer.create({
            data:{
                ...offer
            }
        })
    }

    static async delete(id: number){
        const findOffer = prisma.offer.findUnique({where:{id}})
        if(!findOffer) throw new HttpException(404,'Offer not found')
        return prisma.offer.delete({where:{id}})
    }

    static async update(id:number,offer: Offer){
        const findOffer = prisma.offer.findUnique({where:{id}})
        if(!findOffer) throw new HttpException(404,'Offer not found')
        return prisma.offer.update({
        data:offer,
        where:{id}})
    }

}