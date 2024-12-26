const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const { ObtenerSedes } = require('../services/obtenerSedes');


const generarPlantilla = async (_, res) => {
    try {
        const baseDir = path.join(__dirname, '../excel', 'base');
        const salidaDir = path.join(__dirname, '../excel', 'salida');
        if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
        if (!fs.existsSync(salidaDir)) fs.mkdirSync(salidaDir, { recursive: true });
        // garantizar que la plantilla excel exista
        const plantillaPath = path.join(baseDir, 'U_PLANTILLA_CERTIFICADO_QR.xlsx');
        if (!fs.existsSync(plantillaPath)) {
            return res.status(400).json({msg: 'El archivo de plantilla debe existir en la carpeta base.', status: 400});
        };
        const libro = XLSX.readFile(plantillaPath);
        // borra todas las hojas a partir de la tercera hoja
        while (libro.SheetNames.length> 2){
            const sheetName = libro.SheetNames[2];
            delete workbook.Sheets[sheetName];
            workbook.SheetNames.splice(2, 1);
        }
        const {recordset, output} = await ObtenerSedes();
        // HOJA EVENTO - TERCERA HOJA [3]
        const eventoData = [
          ["EVENTO_ID", "NOMBRE_EVENTO", "FECHA_EVENTO", "LUGAR", "SEDE"]
        ];
        recordset.forEach(row => {
            eventoData.push([row.id, row.evento, row.fecha_evento, row.lugar, row.sede])
        });
        // Agrega la hoja "EVENTO"
        const eventoSheet = XLSX.utils.aoa_to_sheet(eventoData);
        XLSX.utils.book_append_sheet(libro, eventoSheet, "EVENTO");
        // GUARDAR EN LA CARPETA SALIDA
        const filePath = path.join(salidaDir, 'U_PLANTILLA_CERTIFICADO_QR1.xlsx');
        // EVITAR PLANTILLA DUPLICADA
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            console.log('------------------------------------');
            console.log(`Plantilla anterior eliminado: ${filePath}`);
            console.log('------------------------------------');
        }
        XLSX.writeFile(libro, filePath);
        console.log(`Archivo guardado en: ${filePath}`);
        return res.status(200).json({msg: `Archivo guardado en: ${filePath}`});
    } catch (error) {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        console.error('Error al generar la plantilla:', error);
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        return res.status(500).send('Error al generar la plantilla');
    }
};

module.exports = { generarPlantilla };