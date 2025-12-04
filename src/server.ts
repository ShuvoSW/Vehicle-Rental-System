import express, { Request, Response } from "express";
const app = express()
import { Pool } from "pg"
import config from "./config";
const port = config.port;

const pool = new Pool({
    connectionString: `${config.connection_str}`
})

app.post(port, (req: Request, res: Response) => {
    try{
       res.send("good")
    }catch(err) {
         console.log(err);
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})