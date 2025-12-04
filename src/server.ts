import express from "express";
const app = express()

import config from "./config";

const port = config.port;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})