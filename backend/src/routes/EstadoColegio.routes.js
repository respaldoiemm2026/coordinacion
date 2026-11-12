import express from 'express';
import * as EstadoColegioController from '../controllers/EstadoColegio.controller.js';

const router = express.Router();

router.get('/', EstadoColegioController.obtenerTodos);
router.get('/ultimo', EstadoColegioController.obtenerUltimo);
router.get('/:id', EstadoColegioController.obtenerPorId);
router.post('/', EstadoColegioController.crear);
router.put('/:id', EstadoColegioController.actualizar);
router.delete('/:id', EstadoColegioController.eliminar);

export default router;
