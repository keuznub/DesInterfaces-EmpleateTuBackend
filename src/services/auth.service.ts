import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()
const TOKKEN_PASSWORD = process.env.TOKKEN_PASSWORD || "pass"
export class AuthService {
    static async register(user: User) {
        const findUser = await prisma.user.findUnique(
            {
                where: {
                    email: user.email
                }
            }
        )
        if (findUser) throw new Error(`User ${user.email} already exists`)
        const passwordEncrypted = await bcrypt.hash(user.password, 10)

        return await prisma.user.create(
            {
                data: {
                    ...user, password: passwordEncrypted, role: "admin"
                },
                omit: {
                    password: true
                }
            }
        )


    }

    static async login(user: User){
        const findUser = await prisma.user.findUnique({where:{email:user.email}})
        
        if(!findUser) throw new Error("No existe el usuario")
        
        const rightPassword = await bcrypt.compare(user.password,findUser.password)

        if(!rightPassword) throw new Error("Password Incorrecta")

        const token = jwt.sign({id:findUser.id, role:findUser.role, email:findUser.email}, TOKKEN_PASSWORD, {expiresIn:"1h"})
        return token
    }   


}