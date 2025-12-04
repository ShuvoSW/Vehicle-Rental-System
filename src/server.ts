import express, { Request, Response } from "express";
const app = express()

const port = "5000"

app.post(port, (req: Request, res: Response) => {
    try{
       res.send("good")
    }catch(err) {

    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})