import { Router } from "express"
import { authController } from "./auth.controller";


const router=Router()
router.post('/api/v1/auth/signUp',authController.createUser)
router.post('/api/v1/auth/signIn',authController.loginUser)


export const authRouter= router; 