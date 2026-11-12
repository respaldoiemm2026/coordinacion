import express from 'express';
import * as AvisoController from '../controllers/Aviso.controller.js';

const router = express.Router();

router.get('/', AvisoController.obtenerTodos);
router.get('/ultimo', AvisoController.obtenerUltimo);
router.get('/:id', AvisoController.obtenerPorId);
router.post('/', AvisoController.crear);
router.put('/:id', AvisoController.actualizar);
router.delete('/:id', AvisoController.eliminar);

export default router;
