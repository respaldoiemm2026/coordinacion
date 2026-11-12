import express from 'express';
import * as UsuarioController from '../controllers/Usuario.controller.js';
import { requireRol } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', UsuarioController.obtenerTodos);
router.get('/nombre/:nombreUsuario', UsuarioController.obtenerPorNombreUsuario);
router.get('/:id', UsuarioController.obtenerPorId);
// Crear, modificar (incluido el rol) y borrar usuarios solo lo puede hacer un admin
router.post('/', requireRol('admin'), UsuarioController.crear);
router.put('/:id', requireRol('admin'), UsuarioController.actualizar);
router.delete('/:id', requireRol('admin'), UsuarioController.eliminar);

export default router;
