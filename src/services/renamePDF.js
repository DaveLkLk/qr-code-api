const fs = require('fs');
const path = require('path');
const { promisify} = require('util')


const certificadoDir = path.join(__dirname, '../certificados')


function renamePDF(routeDir, data){
    try {
        data.forEach(i => {
            const nombreActual = path.join(routeDir, i.nombreActual)
            const newName = path.join(routeDir, `${i.dni}-${i.hash}.pdf`)
            if(fs.existsSync(nombreActual)){
                fs.renameSync(nombreActual, newName);
            }else{
                console.error(`El archivo no existe: ${nombreActual}`);
            }
        })
        console.log('✔ Proceso de renombrado COMPLETADO');
    } catch (error) {
        console.error(error.message);
    }
}
module.exports = {renamePDF}