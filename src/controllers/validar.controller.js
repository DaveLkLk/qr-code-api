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
            .input('hash', codigo)
            .query(QUERY.post_codigo)
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
            return res.status(404).json({msg: `La carpeta destino no existe: ${fileDirDestino}`, path: null, status: false})
        }
        const nameFile = path.basename(`${path_certificado}-${cargo}.pdf`);
        const fullPath = path.join(fileDirDestino, nameFile);
        if(!fs.existsSync(fullPath)){
            return res.status(404).json({msg: 'El archivo del certificado no se encontró en el servidor.'});
        }
        res.setHeader('Content-Type', 'application/pdf');
        const fileStream = fs.createReadStream(fullPath)
        fileStream.pipe(res)
        // res.status(200).json({
        //     status: true,
        //     data: {
        //         usuario: {
        //             ✅nombre: `${ap_paterno} ${ap_materno} ${nombres}`
        //         },
        //         entidad: {
        //             evento: '', 
        //             certificadoFecha: '', 
        //             certificadoLugar: '', 
        //             area: ''
        //         },
        //         info: {
        //             ✅codigo: codigo,
        //             fechaEmision: ''
        //         },
        //         obs: {
        //             descripcion: ''
        //         },
        //         digital: {
        //             ✅src: fullPath,
        //             ✅type: 'application/pdf',
        //             ✅name: `C-${ap_paterno} ${ap_materno} ${nombres}`
        //         }
        //     },
        //     title: `Certificado-${ap_paterno} ${ap_materno} ${nombres}`
        // });
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
async function ValidarDataCertificado(){
    try {
        const pool = (await getConnection()).pool;

    } catch (error) {
        console.error(error.message);
    }
}
module.exports = { ValidarCertificadoPDF}
