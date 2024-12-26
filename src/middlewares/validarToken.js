const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.TOKEN_JWT || 'secret_key_undefined';

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token',status: 401, path: '/login' });
        return
    }
    try {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                console.dir({msg: 'Token inválido o expirado'}, {depth:null, colors:true});
                return res.status(403).json({ message: 'Token inválido o expirado', page: '/login', status: 403 });
            }
            req.user = user;
            console.dir({msg: 'usuario autenticado: => next()'}, {depth:null, colors:true});
            next();
        });
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado', message: error.message });
    }
}
module.exports = authenticateToken;
