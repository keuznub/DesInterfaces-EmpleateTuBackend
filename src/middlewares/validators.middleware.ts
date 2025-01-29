import { NextFunction, Request, Response } from 'express'
import {body, validationResult } from 'express-validator'

export const registerValidation = [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:4}).withMessage("Password too short"),
    body('name').notEmpty().withMessage("Name required")
]

export const loginValidation = [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:4}).withMessage("Password too short")
]

export const ValidationMiddleware = (req: Request, res:Response, next:NextFunction): any=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    next()
}