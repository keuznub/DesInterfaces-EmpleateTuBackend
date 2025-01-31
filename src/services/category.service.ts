import { Category, PrismaClient, User } from "prisma/prisma-client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { HttpException } from "../exceptions/HttpException";

const prisma = new PrismaClient()
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "pass"

export class CategoryService {

    static async getById(id: number) {
        const findCategory = await prisma.category.findUnique({ where: { id:id } })
        if (!findCategory) throw new HttpException(404,"Offer not found")
        return findCategory
    }

    static async getAll() {
        const findCategories = await prisma.category.findMany()
        if (!findCategories) throw new HttpException(404,"Offers not found")
        return findCategories
    }

    static async save(category: Category){
        return await prisma.category.create({
            data:{
                ...category
            }
        })
    }

    static async delete(id: number){
        const findCategory = prisma.category.findUnique({where:{id}})
        if(!findCategory) throw new HttpException(404,'Offer not found')
        return prisma.category.delete({where:{id}})
    }

    static async update(id:number,category: Category){
        const findCategory = prisma.category.findUnique({where:{id}})
        if(!findCategory) throw new HttpException(404,'Offer not found')
        return prisma.category.update({
        data:category,
        where:{id}})
    }

}