import express from 'express';
import * as GrupoController from '../controllers/Grupo.controller.js';

const router = express.Router();

router.get('/', GrupoController.obtenerTodos);
router.get('/:id', GrupoController.obtenerPorId);
router.post('/', GrupoController.crear);
router.put('/:id', GrupoController.actualizar);
router.delete('/:id', GrupoController.eliminar);

export default router;
