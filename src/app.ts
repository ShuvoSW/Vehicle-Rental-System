import express, { Request, Response } from "express"
import { userRoutes } from "./modules/user/user.routes";
import initDB from "./config/db";

const app = express()

app.use(express.json());

initDB()

app.get("/", (req: Request, res: Response) => {
    res.send("Hello")
})

app.use("/api/v1/users", userRoutes)

app.use("api/v1/auth", userRoutes)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    })
})

export default app;