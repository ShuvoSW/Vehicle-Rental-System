import { Router } from "express"
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";


const router=Router()
router.post('/api/v1/bookings',auth('admin','customer'),bookingController.addBooking)
router.get('/api/v1/bookings',auth(),bookingController.getBooking)

router.put('/api/v1/bookings/:id',auth(),bookingController.updateBooking)



export const bookingRouter= router;