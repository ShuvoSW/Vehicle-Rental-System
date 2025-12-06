import express from "express";
import { usersControllers } from "./customers.controller";
const router = express.Router()

router.post("/", usersControllers.createUser);

export const customersRoutes = router;