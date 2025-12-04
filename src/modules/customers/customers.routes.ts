import express from "express";
import { customersControllers } from "./customers.controller";
const router = express.Router()

router.post("/", customersControllers.createCustomer);

export const customersRoutes = router;