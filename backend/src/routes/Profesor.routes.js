import express from 'express';
import * as ProfesorController from '../controllers/Profesor.controller.js';

const router = express.Router();

router.get('/', ProfesorController.obtenerTodos);
router.get('/:id', ProfesorController.obtenerPorId);
router.post('/', ProfesorController.crear);
router.put('/:id', ProfesorController.actualizar);
router.delete('/:id', ProfesorController.eliminar);

export default router;
