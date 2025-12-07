import { pool } from "../../config/DB";

const createVehicleDB = async (payload: Record<string, any>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await pool.query(`INSERT INTO vehicles( vehicle_name, type, registration_number, daily_rent_price, availability_status ) VALUES($1,$2,$3,$4,$5) RETURNING*`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status])
    return result;
}
const getallVehicleDB = async () => {
    const result = await pool.query(`SELECT * FROM vehicles*`)
    return result;
}
const getSingleVehicleDB = async (id: any) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id])
    return result;
}
const updateVehicleDB = async (payload: Record<string, any>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload.body
    const result = await pool.query(`UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING*`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, payload.params.id])
    return result;
}
const deleteVehicleDB = async (id: string | undefined) => {
    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING*`, [id])
    return result;
}



export const vehicleService = {
    createVehicleDB,
    getallVehicleDB,
    getSingleVehicleDB,
    updateVehicleDB,
    deleteVehicleDB,

}