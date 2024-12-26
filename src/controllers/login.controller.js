const { getConnection } = require('../db/conexion.js')
const {usuarios} =  require("../db/data.js");
const jwt = require('jsonwebtoken');
function LoginControllerSystem(req){
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        return {
            status: 'validation',
            message: 'Debes enviar el nombre de usuario y la contraseña',
            user: null
        }
    }
    if(username && password){
        const isUser = usuarios.find(user => user.usuario === username && user.password === password);
        console.log(isUser);
        if(isUser){
            return {
                status: 'success',
                message: 'Login correcto',
                user: {
                    username: 'joe',
                    name: 'John Doe'
                }
            }
        }
        if(!isUser){
            return {
                status: 'error',
                message: 'credenciales invalidas',
                user: null
            }
        }
    }
}
module.exports = {LoginControllerSystem}
/*
EJEMPLO DE RESPUESTA DEL SERVIDOR:
{
  "status": "success", // o "error", "validation"
  "message": "Login exitoso", // Mensaje descriptivo
  "data": {
    "token": "JWT-TOKEN-AQUI",
    "user": {
      "id": "12345",
      "name": "Juan Perez",
      "email": "juan.perez@example.com"
    }
  }
}
*/