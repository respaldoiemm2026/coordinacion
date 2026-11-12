import express from 'express';
import * as ProfesorMateriaController from '../controllers/ProfesorMateria.controller.js';

const router = express.Router();

router.get('/', ProfesorMateriaController.obtenerTodos);
router.get('/:profesorId/:materiaId', ProfesorMateriaController.obtenerPorClave);
router.post('/', ProfesorMateriaController.crear);
router.delete('/:profesorId/:materiaId', ProfesorMateriaController.eliminar);

export default router;
