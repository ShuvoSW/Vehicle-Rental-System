import { Router } from "express"
import { userController } from "./user.controller";
import auth from "../../middleware/auth";


const router=Router()
router.get('/api/v1/users',auth('admin'),userController.getAllUser)
router.put('/api/v1/users/:id',auth(),userController.updateUser)
router.delete('/api/v1/users/:id',auth('admin'),userController.deleteUser)

export const userRouter= router;