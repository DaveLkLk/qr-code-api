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
// GENERAR HASH DE CERTIFICADO
function GenerarHashID(){
    const LONGITUD = 3
    const hash = crypto.randomBytes(3).toString("hex");
    return hash.substring(0, LONGITUD).toUpperCase();
}
function GenerarHashCertificado(idArea){
    const year = new Date().getFullYear().toString().slice(2,4);
    const idUnidad = idArea.toString().padStart(3, "0");
    const hash = GenerarHashID();
    const fullhash = 'C'+year+idUnidad+''+hash;
    return fullhash
}
// GET DATA BD
async function ObtenerIdAreaToExcel(isList, arr){
    try {
        const pool = (await getConnection()).pool;
        if(!isList){
            const area = await pool.request()
                    .input('oficina', arr.OFICINA)
                    .query(QUERY.query_area)
            return area.recordset[0].idArea
        }
        else{
            const newSet = await Promise.all(arr.map(async (row) => {
                const area = await pool.request()
                    .input('oficina', row.OFICINA)
                    .query(QUERY.query_area)
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
        if(!isList){
            const area = await pool.request()
                    .input('nombre', arr.TIPO_PARTICIPACION)
                    .query(QUERY.query_tipoParticipacion)
            return area.recordset[0].id
        }
        else{
            const newSet = await Promise.all(arr.map(async (row) => {
                const area = await pool.request()
                    .input('nombre', row.TIPO_PARTICIPACION)
                    .query(QUERY.query_tipoParticipacion)
                return area.recordset[0].id
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
            const area = await pool.request()
                    .input('nombre', arr.CARGO)
                    .query(QUERY.query_tipoCargo)
            return area.recordset[0].id
        }
        else{
            const newSet = await Promise.all(arr.map(async(row) => {
                const area = await pool.request()
                    .input('nombre', row.CARGO)
                    .query(QUERY.query_tipoCargo)
                return area.recordset[0].id
            }));
            return newSet
        }
    } catch (error) {
        console.error(error.message)
        return null
    }
}
async function ObtenerIdTipoDocumentoToExcel(isList, arr){
    try {
        const pool = (await getConnection()).pool;
        if(!isList){
            const tipoDoc = await pool.request()
                    .input('tipo_doc', arr.TIPO_DOCUMENTO)
                    .query(QUERY.query_tipoDoc)
            return tipoDoc.recordset[0].idTipo
        }
        else{
            const newSet = await Promise.all(arr.map(async(row) => {
                const area = await pool.request()
                    .input('tipo_doc', row.TIPO_DOCUMENTO)
                    .query(QUERY.query_tipoDoc)
                return area.recordset[0].idTipo
            }));
            return newSet
        }
    } catch (error) {
        console.error(error.message)
        return null
    }
}
async function ObtenerIdEstadoPersonaToExcel(isList, arr){
    let ESTADO_DEFAULT = 'EMITIDO'
    let ESTADO_DEFAULT_ID = 1
    try {
        const pool = (await getConnection()).pool;
        if(!isList){
            const area = await pool.request()
                .input('nombre', ESTADO_DEFAULT)
                .input('id_estado', ESTADO_DEFAULT_ID)
                .query(QUERY.query_estadoPersona)
            return area.recordset[0].id
        }
        else{
            const newSet = await Promise.all(arr.map(async () => {
                const area = await pool.request()
                    .input('nombre', ESTADO_DEFAULT)
                    .input('id_estado', ESTADO_DEFAULT_ID)
                    .query(QUERY.query_estadoPersona)
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
        // return
        const pool = (await getConnection()).pool;
        // Iterar Filas
        const result = await Promise.all(dataExcel.map(async(i) => {
            try {
                let idEstado = await ObtenerIdEstadoPersonaToExcel(false, i)
                let idCargo = await ObtenerIdTipoCargoToExcel(false, i)
                let idParticipacion = await ObtenerIdTipoParticipacionToExcel(false, i)
                let idTipoDocumento = await ObtenerIdTipoDocumentoToExcel(false, i)
                let idArea = await ObtenerIdAreaToExcel(false, i)
                let hash = GenerarHashCertificado(idArea)
                const dbResult = await pool.request()
                    .input('ap_paterno', i.APELLIDO_PATERNO)
                    .input('ap_materno', i.APELLIDO_MATERNO)
                    .input('nombres', i.NOMBRES)
                    .input('tipo_doc', idTipoDocumento)
                    .input('num_doc', i.NUMERO_DOCUMENTO)
                    .input('correo_institucional', i.CORREO_INSTITUCIONAL)
                    .input('correo_personal', i.CORREO_PERSONAL)
                    .input('evento_id', i.CORREO_PERSONAL) // ADD
                    .input('participacion_id', idParticipacion)
                    .input('estado_persona', idEstado)
                    .input('cargo_id', idCargo)
                    .input('oficina_id', idArea)
                    .input('path_certificado', `${i.NUMERO_DOCUMENTO}-${hash}-${i.CARGO}`)
                    .input('codigo_hash', hash)
                    .input('observaciones', '')
                    .input('fecha_emision', i.FECHA_EMISION)
                    .execute(QUERY.sp_crearPersona)
                return dbResult.recordset
            } catch (error) {
                throw error
            }
        }));
        return res.json(result);
        // console.info('---------------------------------------------');
        // console.info('Tabla personas:');
        // console.info('Filas insertadas: '+result.length);
        // console.info('---------------------------------------------');
        res.status(200).json({success: true, data: `Se insertaron ${result.length} filas.`, msg: ''})
    } catch (error) {
        console.error('---------------------------------------------');
        console.error('ERROR DE INSERT EN LA TABLA:');
        console.error(error);
        console.error(error.message);
        console.error('---------------------------------------------');
        res.status(500).json({data: null, msg: error.message, success: false})
    }
}
module.exports = {CargarDataBD}