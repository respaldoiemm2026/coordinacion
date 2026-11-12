import * as AuthService from "../services/Auth.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

// El token viaja en una cookie httpOnly; authRequired la lee en cada petición
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000
};

const register = asyncController(async (req, res) => {
  const usuario = await AuthService.registerUsuario(req.body);
  return sendSuccess(res, usuario, 201);
});

const login = asyncController(async (req, res) => {
  const { nombreUsuario, contrasena } = req.body ?? {};
  const { token, usuario } = await AuthService.loginUsuario(nombreUsuario, contrasena);
  res.cookie('token', token, COOKIE_OPTIONS);
  return sendSuccess(res, usuario);
});

const logout = asyncController(async (req, res) => {
  const { maxAge, ...clearOptions } = COOKIE_OPTIONS;
  res.clearCookie('token', clearOptions);
  return sendSuccess(res, { mensaje: 'Sesión cerrada' });
});

const me = asyncController(async (req, res) =>
  sendSuccess(res, await AuthService.fetchUsuarioActual(req.user.id))
);

export { register, login, logout, me };
