import { PrismaClient, User } from "prisma/prisma-client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()
const TOKKEN_PASSWORD = process.env.TOKKEN_PASSWORD || "pass"
export class UserService {
    static async getByEmail(email: string) {
        const findUser = await prisma.user.findUnique({ where: { email:email } })
        if (!findUser) throw new Error("User not found")
        return findUser
    }

    static async getById(id: number) {
        const findUser = await prisma.user.findUnique({ where: { id:id } })
        if (!findUser) throw new Error("User not found")
        return findUser
    }

    static async getAllUsers() {
        const findUsers = await prisma.user.findMany()
        if (!findUsers) throw new Error("Users not found")
        return findUsers
    }

}