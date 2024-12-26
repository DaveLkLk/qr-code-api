const XLSX = require('xlsx');
const path = require('path');

function fechaExcel(dateStr) {
    const [month, day, year] = dateStr.split('/'); // Separar por "/"
    return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-20${year}`;
}
/**
 * Crea un archivo Excel con datos organizados por mes.
 * @param {string} fileName - Nombre del archivo Excel a crear.
 * @param {number} iniciarFila - Número de fila donde iniciara la lectura del archivo Excel.
 * @param {boolean} hoja$ - Número de hoja que será leida del archivo Excel.
 * @returns {Object} - Objeto que contiene las hojas con los meses indicados del archivo.
 */
function ObtenerDataExcel({filename, iniciarFila, hoja1, hoja2, hoja3, hoja4, hoja5}) { // LIMITE: 5 HOJAS
    // Ruta al archivo .xlsx
    const filePath = path.join(__dirname, `../excel/masivo/${filename}.xlsx`);
    // Leer el archivo
    const workbook = XLSX.readFile(filePath);
    // ESTABLECER LAS HOJAS QUE SERAN LEIDAS
    const Hoja1 = !hoja1 ? false : true;
    // const Hoja2 = !hoja2 ? false : true;
    // const Hoja3 = !hoja3 ? false : true;
    // const Hoja4 = !hoja4 ? false : true;
    // const Hoja5 = !hoja5 ? false : true;
    
    // Obtener las hojas segun el orden y los datos de las hojas
    const PrimeraHoja = Hoja1 ? workbook.Sheets[workbook.SheetNames[0]] : null; // primera hoja
    // const SegundaHoja = Hoja2 ? workbook.Sheets[workbook.SheetNames[1]] : null; // segunda hoja
    // const TerceraHoja = Hoja3 ? workbook.Sheets[workbook.SheetNames[2]] : null; // tercera hoja
    // const CuartaHoja = Hoja4 ? workbook.Sheets[workbook.SheetNames[3]] : null; // cuarta hoja
    // const QuintaHoja = Hoja5 ? workbook.Sheets[workbook.SheetNames[4]] : null; // quinta hoja
    // Convertir los datos de la hoja a formato JSON
    const options = { range: iniciarFila, raw: false }; // Posicion de Fila
    const data = {}
    if(PrimeraHoja) data.pageOne = XLSX.utils.sheet_to_json(PrimeraHoja, options);
    // if(SegundaHoja) data.organizador = XLSX.utils.sheet_to_json(SegundaHoja, options);
    // if(TerceraHoja) data.asistente = XLSX.utils.sheet_to_json(TerceraHoja, options);
    // if(CuartaHoja) data.colaborador = XLSX.utils.sheet_to_json(CuartaHoja, options);
    // if(QuintaHoja) data.extra = XLSX.utils.sheet_to_json(QuintaHoja, options);
    // PARSEAR LA FECHA
    data.pageOne.forEach(row => {
        if(row.FECHA_EMISION){
            row.FECHA_EMISION = fechaExcel(row.FECHA_EMISION);
        }
    })
    return {...data}
}
module.exports = {ObtenerDataExcel}