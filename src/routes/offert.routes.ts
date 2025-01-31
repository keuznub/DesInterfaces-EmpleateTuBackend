import { Router } from "express";
import { OffertController } from "../controllers/offert.controller";
import { isAdmin, isAuthenticate, isValidLogin } from "../middlewares/auth.middleware";
import {registerValidation, ValidationMiddleware, loginValidation} from '../middlewares/validators.middleware'


const router = Router()

//GET Listar todas las ofertas localhost:3000/api/offerts/?title=react&category=DAM
router.get("/",isAuthenticate, OffertController.getAll)
//GET listar 1 oferta localhost:3000/api/offerts/id
router.get("/:id",isAuthenticate, OffertController.getById)
//POST localhost:3000/api/offerts/ {body}
router.post("/",isAuthenticate,isAdmin, OffertController.save)
//DELETE localhost:3000/api/offerts/id
router.delete("/:id",isAuthenticate,isAdmin, OffertController.delete)
//PUT localhost:3000/api/offerts/id {body}
router.put("/:id",isAuthenticate,isAdmin, OffertController.update) 

//POST Calificamos la oferta x {body}
//router.post('/:id/rate', OffertController.rate)
//Vemos que calificacion (total) se le ha dado au una oferta
//router.get('/:id/rate', OffertController.getRate)

export default router


