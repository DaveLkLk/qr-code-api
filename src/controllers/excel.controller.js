const crypto = require("crypto");
const { ObtenerDataExcel } = require('../services/leerExcel.js')
const { getConnection } = require('../db/conexion.js')
const { QUERY } = require('../db/query.js');


function READ_EXCEL(){
    let options = {
        filename: 'U_PLANTILLA_CERTIFICADO_QR1',
        iniciarFila: 0,
        hoja1: true,
    }
    const data = ObtenerDataExcel(options).pageOne
    console.info('---------------------------------------------');
    console.info('--Lectura de Excel--');
    console.info('Se encontraron: '+data.length+' filas');
    console.info('---------------------------------------------');
    return data;
}
//  GENERAR HASH NUM DOC
function generarHashDigitos(input) {
    const LONGITUD = 3;
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    // Tomar los primeros 3 caracteres del hash y convertirlo a un número
    const hash3Digitos = parseInt(hash.slice(0, LONGITUD), 16) % 1000; // toma los 3 primeros digitos
    return hash3Digitos.toString().padStart(3, '0');
}
// GENERAR HASH DE CERTIFICADO
function GenerarHashID(){
    const LONGITUD = 3
    const hash = crypto.randomBytes(3).toString("hex");
    return hash.substring(0, LONGITUD).toUpperCase();
}
function GenerarHashCertificado(num_doc){
    const year = new Date().getFullYear().toString().slice(2,4);
    const idUnidad = generarHashDigitos(num_doc);
    const hash = GenerarHashID();
    const fullhash = 'C'+year+idUnidad+''+hash;
    return fullhash
}
// GET DATA BD
async function ObtenerIdAreaToExcel(isList, arr){
    try {
        const pool = (await getConnection()).pool;
        const sql = (await getConnection()).sql;
        if(!isList){
            let ID = isNaN(Number(arr.OFICINA)) ? 0 : Number(arr.OFICINA)
            const area = await pool.request()
                    .input('id', sql.Int, ID)
                    .execute(QUERY.sp_getArea)
            return area.recordset[0].idArea
        }
        else{
            const newSet = await Promise.all(arr.map(async (row) => {
                let ID = typeof row.OFICINA === 'string' ? 0 : row.OFICINA
                const area = await pool.request()
                    .input('id', ID)
                    .execute(QUERY.sp_getArea)
                return area.recordset[0].idArea
            }));
            return newSet
        }
    } catch (error) {
        console.error(error.message)
        return null
    }
}
async function ObtenerIdTipoParticipacionToExcel(isList, arr){
    try {
        const pool = (await getConnection()).pool;
        const sql = (await getConnection()).sql;
        if(!isList){
            const participacion = await pool.request()
                    .input('participacion', sql.NVarChar, arr.TIPO_PARTICIPACION)
                    .execute(QUERY.sp_getParticipacion)
            if(participacion.recordset.length > 0){
                return participacion.recordset[0]
            }else{
                return null;
            }
        }
        else{
            const newSet = await Promise.all(arr.map(async (row) => {
                const ptcn = await pool.request()
                    .input('participacion', sql.NVarChar, row.TIPO_PARTICIPACION)
                    .execute(QUERY.sp_getParticipacion)
                if(ptcn.recordset.length > 0){
                    return ptcn.recordset[0]
                }else{
                    return null;
                }
            }));
            return newSet
        }
    } catch (error) {
        console.error(error.message)
        return null
    }
}
async function ObtenerIdTipoCargoToExcel(isList, arr){
    try {
        const pool = (await getConnection()).pool;
        if(!isList){
            // SETEO DE INVITADA -> INVITADO
            const area = await pool.request()
                    .input('nombre', arr)
                    .execute(QUERY.sp_getTipoCargo)
            return area.recordset[0].id
        }
        else{
            const newSet = await Promise.all(arr.map(async(row) => {
                const area = await pool.request()
                    .input('nombre', cargo)
                    .execute(QUERY.sp_getTipoCargo)
                return area.recordset[0].id
            }));
            return newSet
        }
    } catch (error) {
        console.error(error.message)
        return null
    }
}
// este ya esta
async function ObtenerIdTipoDocumentoToExcel(isList, arr){
    try {
        const pool = (await getConnection()).pool;
        const sql = (await getConnection()).sql;
        if(!isList){
            if(typeof arr.TIPO_DOCUMENTO !== 'string'){
                console.error('ERROR: Tipo de documento es inválido');
                return 0
            }
            const tipoDoc = await pool.request()
                    .input('tipo_doc', sql.NVarChar, arr.TIPO_DOCUMENTO)
                    .execute(QUERY.sp_getTipoDoc)
            return tipoDoc.recordset[0].idTipo
        }
        else{
            const newSet = await Promise.all(arr.map(async(row) => {
                if(typeof row.TIPO_DOCUMENTO !== 'string'){
                    console.error('ERROR: Tipo de documento es inválido');
                    return 0
                }
                const area = await pool.request()
                    .input('tipo_doc', sql.NVarChar, row.TIPO_DOCUMENTO)
                    .execute(QUERY.sp_getTipoDoc)
                return area.recordset[0].idTipo
            }));
            return newSet
        }
    } catch (error) {
        console.error(error.message)
        return null
    }
}
// este ya esta
async function ObtenerIdEstadoPersonaToExcel(isList, arr){
    let ESTADO_DEFAULT = 'EMITIDO'
    let ESTADO_DEFAULT_ID = 1
    try {
        const pool = (await getConnection()).pool;
        if(!isList){
            const area = await pool.request()
                .input('nombre', ESTADO_DEFAULT)
                .input('id_estado', ESTADO_DEFAULT_ID)
                .execute(QUERY.sp_getEstadoPersona)
            return area.recordset[0].id
        }
        else{
            const newSet = await Promise.all(arr.map(async () => {
                const area = await pool.request()
                    .input('nombre', ESTADO_DEFAULT)
                    .input('id_estado', ESTADO_DEFAULT_ID)
                    .execute(QUERY.sp_getEstadoPersona)
                return area.recordset[0].id
            }));
            return newSet
        }
    } catch (error) {
        console.error(error.message)
        return null
    }
}
// -----------------------
async function CargarDataBD(_, res){
    try {
        const dataExcel = READ_EXCEL();
        // return res.json(dataExcel)
        const pool = (await getConnection()).pool;
        const sql = (await getConnection()).sql;
        // Iterar Filas
        const result = await Promise.all(dataExcel.map(async(i) => {
            try {
                let cargo = String(i.CARGO).trim().toUpperCase().includes('DOCENTE INVIT') ? 'DOCENTE INVITADO' : i.CARGO;
                let cargoPath = cargo.toString().trim().toUpperCase().replace(/ /g, '_');
                let idEstado = await ObtenerIdEstadoPersonaToExcel(false, i)
                let idCargo = await ObtenerIdTipoCargoToExcel(false, cargo)
                let idParticipacion = await ObtenerIdTipoParticipacionToExcel(false, i)
                let idTipoDocumento = await ObtenerIdTipoDocumentoToExcel(false, i)
                let idArea = await ObtenerIdAreaToExcel(false, i)
                let strArea = !idArea ? i.OFICINA : '';
                let hash = GenerarHashCertificado(i.NUMERO_DOCUMENTO)
                // VALIDAR QUE EL DNI SEA DE 8 DIGITOS
                let newDNI = i.NUMERO_DOCUMENTO;
                if(idTipoDocumento === '001'){
                    newDNI = String(i.NUMERO_DOCUMENTO).padStart(8, '0')
                }
                // prueba
                // return {idParticipacion, strArea, idArea}
                // return {dni: newDNI, mat: i.APELLIDO_MATERNO, pat: i.APELLIDO_PATERNO}
                // EXEC
                // console.log(idParticipacion.id);
                const dbResult = await pool.request()
                    .input('ap_paterno', sql.NVarChar, i.APELLIDO_PATERNO)
                    .input('ap_materno', sql.NVarChar, i.APELLIDO_MATERNO)
                    .input('nombres', sql.NVarChar, i.NOMBRES)
                    .input('tipo_doc', sql.Int, idTipoDocumento)
                    .input('num_doc', sql.NVarChar, newDNI)
                    .input('correo_institucional', sql.NVarChar, i.CORREO_INSTITUCIONAL)
                    .input('correo_personal', sql.NVarChar, i.CORREO_PERSONAL)
                    .input('evento_id', sql.Int, i.EVENTO_ID)
                    .input('participacion_id', idParticipacion.id)
                    .input('estado_persona_id', sql.Int, idEstado)
                    .input('cargo_id', sql.Int, idCargo)
                    .input('oficina_id', sql.Int, idArea)
                    .input('externo', sql.NVarChar, strArea)
                    .input('path_certificado', sql.NVarChar, `${i.NUMERO_DOCUMENTO}-${hash}-${cargoPath}`)
                    .input('codigo_hash', sql.NVarChar, hash)
                    .input('observaciones', sql.NVarChar, '')
                    .execute(QUERY.sp_crearPersona)
                return dbResult
            } catch (error) {
                throw error
            }
        }));
        // return res.json(result);
        // console.log(result);
        // console.info('---------------------------------------------');
        // console.info('Tabla personas:');
        // console.info('Filas insertadas: '+result.length);
        // console.info('---------------------------------------------');
        console.log(result.forEach((i, acc) => console.log(acc+ ' - '+i.recordset[0].mensaje)));
        return res.status(200).json({success: true, data: `Se insertaron ${result.length} filas.`, msg: ''})
    } catch (error) {
        console.error('---------------------------------------------');
        console.error('ERROR DE INSERT EN LA TABLA:');
        // console.error(error);
        console.error(error.message);
        console.error('---------------------------------------------');
        res.status(500).json({data: null, msg: error.message, success: false})
    }
}
module.exports = {CargarDataBD}