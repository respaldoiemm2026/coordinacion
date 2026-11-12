import { verifyToken } from '../utils/jwt.js';

export const authRequired = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ ok: false, mensaje: 'No autenticado' });
    }

    try {
        req.user = verifyToken(token);
        next();
    } catch (error) {
        return res.status(401).json({ ok: false, mensaje: 'Token inválido o expirado' });
    }
};

/** Permite continuar solo si el usuario autenticado tiene alguno de los roles indicados. */
export const requireRol = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
        return res.status(403).json({ ok: false, mensaje: 'No tienes permisos para esta acción' });
    }
    next();
};
