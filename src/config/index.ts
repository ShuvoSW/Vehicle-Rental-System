import dotenv from "dotenv";

const config = {
    connection_str: process.env.CONNECTION_STR,
    port: process.env.PORT
}

export default config;