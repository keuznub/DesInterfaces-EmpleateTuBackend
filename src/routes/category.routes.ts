import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { isAdmin, isAuthenticate } from "../middlewares/auth.middleware";
import {registerValidation, ValidationMiddleware, loginValidation} from '../middlewares/validators.middleware'


const router = Router()

router.get("/",isAuthenticate, CategoryController.getAll)
router.get("/:id",isAuthenticate, CategoryController.getById)
router.post("/",isAuthenticate, isAdmin, CategoryController.save)
router.delete("/:id",isAuthenticate,isAdmin, CategoryController.delete)
router.put("/:id",isAuthenticate,isAdmin, CategoryController.update) 


export default router


