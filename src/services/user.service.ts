import { PrismaClient, User } from "prisma/prisma-client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { HttpException } from "@/exceptions/HttpException";

const prisma = new PrismaClient()
const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "pass"
export class UserService {
    static async getByEmail(email: string) {
        const findUser = await prisma.user.findUnique({ where: { email:email } })
        if (!findUser) throw new HttpException(404,"User not found")
        return findUser
    }

    static async getById(id: number) {
        const findUser = await prisma.user.findUnique({ where: { id:id } })
        if (!findUser) throw new HttpException(404,"User not found")
        return findUser
    }

    static async getAllUsers() {
        const findUsers = await prisma.user.findMany({
            omit:{password:true}
        })
        if (!findUsers) throw new HttpException(404,"Users not found")
        return findUsers
    }

}