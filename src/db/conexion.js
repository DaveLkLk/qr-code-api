const sql = require('mssql');

const db_settings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
}
const db_settingsSEG = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME_SEG,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
}
async function getConnection(){
    try {
        const pool = await sql.connect(db_settings);
        return {pool, sql};
    } catch (error) {
        console.log(error);
    }
}
async function getConnectionSEG(){
    try {
        const pool = await sql.connect(db_settingsSEG);
        return {pool, sql};
    } catch (error) {
        console.log(error);
    }
}
// prueba de conexion
// sql.connect(db_settings, function (err) {
//     if (err) console.log(err.message);
//     if(!err) console.error('conectado a la bd');
// });
module.exports = { getConnection, getConnectionSEG }