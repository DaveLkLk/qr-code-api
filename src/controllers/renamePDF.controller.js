const { renamePDF } = require("../services/renamePDF");
const { promisify } = require("util");
const fs = require("fs");
const { getConnection } = require("../db/conexion");
const { QUERY } = require("../db/query");
const path = require("path");

const rename = promisify(fs.rename);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const access = promisify(fs.access);

function normalizarSTR(text) {
    return text.replace(/[áÁ]/g, 'a')
        .replace(/[éÉ]/g, 'e')
        .replace(/[íÍ]/g, 'i')
        .replace(/[óÓ]/g, 'o')
        .replace(/[úÚ]/g, 'u');
}
async function renamePDFTable(req = Request, res = Response) {
  try {
    const labPath = path.join(__dirname, "../laboratorio");
    const cerPath = path.join(__dirname, "../certificados");
    // CREAR CARPETAS SEGUN EL AÑO Y MES
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const monthNames = [ 
        "enero", "febrero", "marzo", "abril", "mayo", "junio", 
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const month = monthNames[currentDate.getMonth()];
    const yearPath = path.join(cerPath, year);
    try {
      await access(yearPath);
    } catch {
      await mkdir(yearPath, { recursive: true });
    }
    const monthPath = path.join(yearPath, month);
    try {
      await access(monthPath);
    } catch {
      await mkdir(monthPath, { recursive: true });
    }
    // const PDFData = renamePDF()
    const pool = (await getConnection()).pool;
    
    // let pat = normalizarSTR("nuñez").toUpperCase();
    // let mat = normalizarSTR("nuñez").toUpperCase();
    // let nom = normalizarSTR("máximo").toUpperCase();
    // let date = "2024-12-19";

    // console.log(pat);
    // console.log(mat);
    // console.log(nom);
    // const findPersona = await pool
    // .request()
    // .input("pat", pat)
    // .input("mat", mat)
    // .input("nom", nom)
    // .input("date", date)
    // .query(QUERY.get_rename);
    
    // if (findPersona.recordset.length === 0) {
    //     return res
    //     .status(404)
    //     .json({
    //       msg: "No se encontró coincidencia",
    //       data: null,
    //       status: false,
    //     });
    // }
    // const { path_certificado } = findPersona.recordset[0];
    // console.log(path_certificado);
    // res.json(findPersona.recordset[0]);
    
    // return
    const files = await readdir(labPath);
    const pdfFiles = files.filter((file) => path.extname(file).toLocaleLowerCase() === ".pdf");
    for (const file of pdfFiles) {
        const filename = path.basename(file, ".pdf");
        // CONSIDERANDO QUE LOS PDF A LEER TENGAN POR NOMBRE LOS APELLIDOS Y NOMBRES
        const numParts = filename.split(" ");
        if (numParts.length < 3) {
            console.log(`Nombre del archivo no tiene el formato esperado: ${file}`);
            continue;
        }
        const pat = normalizarSTR(numParts[0]).toUpperCase();
        const mat = normalizarSTR(numParts[1]).toUpperCase();
        const nom = normalizarSTR(numParts.slice(2).join(" ")).toUpperCase();
        let date = "2024-12-19";
        const findPersona = await pool
            .request()
            .input("pat", pat)
            .input("mat", mat)
            .input("nom", nom)
            .input("date", date)
            .query(QUERY.get_rename);

        if (findPersona.recordset.length === 0) {
            console.info(`No se encontró un registro para ${file}`);
            continue;
        }
        const { path_certificado, cargo } = findPersona.recordset[0];
        const newFilename = `${path_certificado}-${cargo}.pdf`;
        const oldFilepath = path.join(labPath, file);
        const newFilePath = path.join(monthPath, newFilename);
        await rename(oldFilepath, newFilePath);
        console.log(`Archivo movido a: ${newFilePath}`);
        }
        console.log("Proceso renombrado y movimiento completado");
        res.json({msg: 'Proceso de renombrado y movimiento completado', status: true});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: error.message, status: false});
    }
}

module.exports = { renamePDFTable };
