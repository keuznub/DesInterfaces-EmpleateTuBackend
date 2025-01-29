import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { isAuthenticate, isAdmin } from '../middlewares/auth.middleware'
import {registerValidation} from '../middlewares/validators.middleware'

const router = Router()

router.get("/profile",isAuthenticate, UserController.profile)
//Crea el endpoint que liste todos los usuarios del sitema
router.get("/",isAuthenticate,isAdmin,UserController.allUsers)

export default router


