/*
---------------------------------------------------------
- LOS PDF DEBEN ESTAR RENOMBRADOS BAJO LA NOMENCLATURA:
-------- ✅✅ DNI-CODIGO_VERIFICACION.PDF ✅✅ --------
DE OTRO MODO NO HARÁ MATCH Y DDEVOLVERA UN TIPO DE ERROR
---------------------------------------------------------
*/
const { getConnection } = require('../db/conexion.js');
const path = require('path')
const fs = require('fs');
const { QUERY } = require('../db/query.js');

function obtenerNombreMes(numeroMes) {
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return meses[numeroMes - 1];
}
async function ValidarCertificadoPDF(req, res=Response){
    const { codigo} = req.body
    if(!codigo){
        return res.status(400).json({msg: 'Debe enviar los datos de código de verificación.'})
    }
    try {
        const pool = (await getConnection()).pool;
        const result = await pool.request()
            .input('codigo_hash', codigo)
            .execute(QUERY.sp_validarCertificado)
        if(result.recordset.length === 0){
            return res.status(404).json({
                msg: 'No se encontró un certificado para este código de verificación.', 
                path: null,
                status: false
            });
        }
        const {path_certificado, cargo, fecha_carga} = result.recordset[0];
        const fechaCarga = new Date(fecha_carga).toISOString().split('T')[0];
        const [year, mes] = fechaCarga.split('-')
        const nameMes = obtenerNombreMes(parseInt(mes))
        const fileDirDestino = path.join(__dirname, `../certificados/${year}/${nameMes}`);
        if(!fs.existsSync(fileDirDestino)){
            console.error('Error, no se encontro el certificado en la siguiente ruta: '+fileDirDestino);
            return res.status(404).json({msg: `No se encontró el certificado en la carpeta destino`, path: null, status: false})
        }
        // console.log(path_certificado);
        const nameFile = path.basename(`${path_certificado}.pdf`);
        // console.log(nameFile);
        const fullPath = path.join(fileDirDestino, nameFile);
        if(!fs.existsSync(fullPath)){
            return res.status(404).json({msg: 'El archivo del certificado no se encontró en el servidor.'});
        }
        console.log('Se envia el PDF CERTIFICADO encontrado');
        res.setHeader('Content-Type', 'application/pdf');
        const fileStream = fs.createReadStream(fullPath)
        fileStream.pipe(res)
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ 
            msg: 'Ocurrió un error en el servidor.', 
            path: null, 
            error: error.message, 
            status: false
        });
    }
}
async function DataCertificado(req=Request, res=Response){
    const { codigo } = req.body
    try {
        const pool = (await getConnection()).pool;
        const result = await pool.request()
            .input('codigo_hash', codigo)
            .execute(QUERY.sp_getDatallePersona)
        if(result.recordset.length === 0){
            return res.status(404).json({
                msg: 'No se encontró datos para este certificado con el código de verificación.',
                path: null,
                status: false
            });
        }
        return res.status(200).json(result.recordset[0])
    } catch (error) {
        console.error(error.message);
    }
}
// adicional
async function ExtraeDataXLSX(req=Request, res=Response){
    const {codename } = req.query
}
module.exports = { ValidarCertificadoPDF, DataCertificado}
