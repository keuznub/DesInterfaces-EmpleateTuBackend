import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { isAuthenticate, isAdmin } from '@/middlewares/auth.middleware'


const router = Router()

router.get("/profile",isAuthenticate, UserController.profile)
//Crea el endpoint que liste todos los usuarios del sitema
router.get("/allUsers",isAuthenticate,isAdmin,UserController.allUsers)

export default router


