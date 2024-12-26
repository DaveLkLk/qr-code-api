const {getConnection} = require('../db/conexion.js');
const { tipoCertificadoEstado, tipoParticipacion, tipoPersona, usuarioCertificados, usuarios } = require('../db/data.js');
const fs = require('fs');

async function ValidarDatosCertificado(numeroDocumento, codigoVerificacion){
    try {
        const linkQR = numeroDocumento+"-"+codigoVerificacion;
        if(a){

        }
    } catch (error) {
        console.error(error.message)
        return false;
    }
}
module.exports = ValidarDatosCertificado