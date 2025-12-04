import express from "express";
import config from "./config";

const app = express()
app.use(express.json())

const port = config.port;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})