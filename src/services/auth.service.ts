import { PrismaClient, User } from "prisma/prisma-client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { HttpException } from "@/exceptions/HttpException";

const prisma = new PrismaClient()
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "pass"
export class AuthService {
    static async register(user: User) {
        const findUser = await prisma.user.findUnique(
            {
                where: {
                    email: user.email
                }
            }
        )
        if (findUser) throw new HttpException(404,`User ${user.email} already exists`)
        const passwordEncrypted = await bcrypt.hash(user.password, 10)

        return await prisma.user.create(
            {
                data: {
                    ...user, password: passwordEncrypted, role: null
                },
                omit: {
                    password: true
                }
            }
        )


    }

    static async login(user: User){

        const findUser = await prisma.user.findUnique({where:{email:user.email}})
        
        if(!findUser) throw new HttpException(404,"No existe el usuario ")
        
        const rightPassword = await bcrypt.compare(user.password,findUser.password)

        if(!rightPassword) throw new HttpException(404,"Password Incorrecta")

        const token = jwt.sign({id:findUser.id, role:findUser.role, email:findUser.email}, TOKEN_PASSWORD, {expiresIn:"1h"})
        return token
    }   


}