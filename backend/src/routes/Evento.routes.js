import express from 'express';
import * as EventoController from '../controllers/Evento.controller.js';

const router = express.Router();

router.get('/', EventoController.obtenerTodos);
router.get('/ultimo', EventoController.obtenerUltimo);
router.get('/:id', EventoController.obtenerPorId);
router.post('/', EventoController.crear);
router.put('/:id', EventoController.actualizar);
router.delete('/:id', EventoController.eliminar);

export default router;
