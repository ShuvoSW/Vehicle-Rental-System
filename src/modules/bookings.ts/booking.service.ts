import { Response } from "express";
import { pool } from "../../config/DB";




const addBookingDB = async (payload: Record<string, any>,res:Response) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const startDate: Date = new Date(rent_start_date)
    const endDate: Date = new Date(rent_end_date)
    if (new Date(rent_end_date) <= new Date(rent_start_date)) {
        res.status(400).json({
            success:false,
            message:"rent_end_date must be after rent_start_date"
        })
    }
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id])
    const total_price = vehicle.rows[0].daily_rent_price * totalDays


    await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING*`, ['booked', vehicle_id])



    const result = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date,total_price) VALUES($1,$2,$3,$4,$5) RETURNING*`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price])
    return result;
}


const getBookingDB = async (payload: Record<string, unknown>, user: Record<string, any>) => {
    console.log('booking', user)
    let booking

    if (user.role == 'admin') {
        booking = await pool.query(`SELECT * FROM bookings`)
    }

    if (user.role !== 'admin') {
        booking = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [user.id])

    }


    const today = new Date()
    for (const book of (booking as any).rows) {
        const endDate = new Date(book.rent_end_date)
        if (endDate < today && book.status == 'booked'){
         await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2`, ['returned', book.id])

         await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, ['available', book.vehicle_id])
        }
    }

    
    if (user.role == 'admin') {
        booking = await pool.query(`SELECT * FROM bookings*`)
    }

    if (user.role !== 'admin') {
        booking = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [user.id])

    }

    return booking;
}

const updateBookingDB = async (payload: Record<string, any>) => {


    let result
    const singleBooking = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [payload.params.id])
    const today = new Date();

    if (payload.body.status == 'cancelled' && today <= new Date(singleBooking.rows[0].rent_start_date)) {
        result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING*`, [payload.body.status, payload.params.id])

    };

    if (payload.body.status == 'returned' && payload.user.role == 'admin') {
        result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING*`, [payload.body.status, payload.params.id])
        await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING*`, ['available', result.rows[0].vehicle_id])


    }
    return result;
}


export const bookingService = {
    addBookingDB,
    getBookingDB,
    updateBookingDB,

}