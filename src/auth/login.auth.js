const jwt = require('jwt');
const SECRET_KEY = process.env.TOKEN_JWT || 'secret_key_undefined';
const TOKEN_DURATION = process.env.TOKEN_DURATION || '1h'
/* @params -> store procedure
    {
        "NroDocumento": "00000000",
        "Password": "xxxxxxxx"
    }
*/
let message = ''
async function login_USER_Sistema(req, res){
    try {
        // const user = await st_PROCEDURE_LOGIN(req)
        const {userData, mensaje} = await st_PROCEDURE_LOGIN_SIS(req)
        let msgUserValidate = mensaje === '' ? 'Iniciando sesión...' : mensaje
        message = msgUserValidate
        if(userData.length === 0){
            console.log(mensaje);
            res.status(401).json({user, status: 401, message: mensaje})
        }else{
            const { idUsuario, nombres, Correo, idDocente, nombreUsuario } = await userData[0];
            const token = sign({ idUsuario }, SECRET_KEY, { expiresIn: TOKEN_DURATION });
            const objResponse = {
                token: token,
                User: {
                    id: idUsuario,
                    fullname: nombres,
                    email: Correo,
                    idDocente: idDocente,
                    name: nombreUsuario
                },
                status: 200,
            }
            return res.status(200).json(objResponse);
        }
    } catch (error) { 
        let msgError = `Login.auth :: Catch error-> ${error.message}`;
        console.log(msgError);
        res.status(500).json({message: msgError})
    }
}
module.exports = {login_USER_Sistema}