import { Router } from "express"
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";


const router=Router()
router.post('/api/v1/vehicles',auth('admin'),vehicleController.addNewVehicle)
router.get('/api/v1/vehicles',vehicleController.getAllVehicle)
router.get('/api/v1/vehicles/:id',vehicleController.getSingleVehicle)
router.put('/api/v1/vehicles/:id',auth('admin'),vehicleController.updateVehicle)
router.delete('/api/v1/vehicles/:id',auth('admin'),vehicleController.deleteVehicle)


export const vehicleRouter= router;