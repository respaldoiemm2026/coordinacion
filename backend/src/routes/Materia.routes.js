import express from 'express';
import * as MateriaController from '../controllers/Materia.controller.js';

const router = express.Router();

router.get('/', MateriaController.obtenerTodos);
router.get('/:id', MateriaController.obtenerPorId);
router.post('/', MateriaController.crear);
router.put('/:id', MateriaController.actualizar);
router.delete('/:id', MateriaController.eliminar);

export default router;
