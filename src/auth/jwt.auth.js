const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.JWT_SECRET || 'secret_key_undefined'
const TOKEN_DURATION = process.env.TOKEN_DURATION || '1h'

/**
 * Genera un token JWT y devuelve un objeto con el token y los datos del usuario.
 * @param {Object} userData - Información del usuario a incluir en el token.
 * @param {Object} additionalData - Información adicional que se incluirá en el token.
 * @returns {Object} - Objeto con el token y los datos relacionados.
 */
function generateJWT(userData, additionalData = {}) {
    try {
        const { idUsuario, nombres, Correo, idDocente, nombreUsuario } = userData;

        // Generar el token
        const token = jwt.sign(
            { idUsuario, ...additionalData }, // Payload del token
            SECRET_KEY, // Clave secreta
            { expiresIn: TOKEN_DURATION } // Duración
        );

        // Estructurar la respuesta del token
        const objResponse = {
            token,
            User: {
                id: idUsuario,
                fullname: nombres,
                email: Correo,
                idDocente,
                name: nombreUsuario,
            },
        };

        return objResponse;
    } catch (error) {
        throw new Error(`Error al generar el token JWT: ${error.message}`);
    }
}

module.exports = { generateJWT };

