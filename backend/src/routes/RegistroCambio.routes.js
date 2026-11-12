import express from 'express';
import * as RegistroCambioController from '../controllers/RegistroCambio.controller.js';

const router = express.Router();

router.get('/', RegistroCambioController.obtenerTodos);
router.get('/:id', RegistroCambioController.obtenerPorId);
router.post('/', RegistroCambioController.crear);
router.put('/:id', RegistroCambioController.actualizar);
router.delete('/:id', RegistroCambioController.eliminar);

export default router;
