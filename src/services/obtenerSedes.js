const { getConnection } = require("../db/conexion.js");
const { QUERY } = require("../db/query.js");

async function ObtenerSedes(){
    try {
        const pool = (await getConnection()).pool;
        return await pool.request().execute(QUERY.sp_getSedes)
    } catch (error) {
        console.error(error.message);
        return null
    }
}

module.exports = { ObtenerSedes }