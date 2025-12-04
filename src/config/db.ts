import { Pool } from "pg";
import config from ".";

const pool = new Pool({
    connectionString: `${config.connection_str}`
})

cosnt 