import { Router } from "express";
import { OffertController } from "../controllers/offert.controller";
import { isValidLogin } from "../middlewares/auth.middleware";
import {registerValidation, ValidationMiddleware, loginValidation} from '../middlewares/validators.middleware'


const router = Router()

//GET Listar todas las ofertas localhost:3000/api/offerts/?title=react&category=DAM
router.get("/", OffertController.getAll)
//POST localhost:3000/api/offerts/ {body}
router.post("/", OffertController.save)
//DELETE localhost:3000/api/offerts/id
router.delete("/:id", OffertController.delete)
//PUT localhost:3000/api/offerts/id {body}
router.put("/:id", OffertController.update) 

//POST Calificamos la oferta x {body}
//router.post('/:id/rate', OffertController.rate)
//Vemos que calificacion (total) se le ha dado au una oferta
//router.get('/:id/rate', OffertController.getRate)

export default router


