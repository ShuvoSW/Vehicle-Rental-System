import { Request, Response } from "express"
import { bookingService } from "./booking.service"


const addBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.addBookingDB(req.body,res)
        res.status(201).json({
            "success": true,
            "message": "booking successfully",
            "data": result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            "success": false,
            "message": error.message
        })

    }

}

const getBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getBookingDB(req.body, (req as any).user) as any
        if (result.rows.length == 0) {
            res.status(404).json({
                success: false,
                message: 'booking not found'
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "Bookings retrieved successfully",
                "data": result.rows
            })
        }

    } catch (error: any) {
        res.status(500).json({
            "success": false,
            "message": error.message
        })

    }

}

const updateBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.updateBookingDB(req) as any
        if (result.rows.length == 0) {
            res.status(404).json({
                success: false,
                message: 'booking not found'
            })
        } else {
            res.status(201).json({
                "success": true,
                "message": "Booking cancelled successfully",
                "data": result.rows[0]
            })
        }

    } catch (error: any) {
        res.status(500).json({
            "success": false,
            "message": error.message
        })

    }

}

export const bookingController = {
    addBooking,
    getBooking,
    updateBooking
}