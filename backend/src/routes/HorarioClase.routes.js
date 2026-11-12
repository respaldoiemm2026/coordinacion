import express from 'express';
import * as HorarioClaseController from '../controllers/HorarioClase.controller.js';

const router = express.Router();

router.get('/', HorarioClaseController.obtenerTodos);
router.get('/:id', HorarioClaseController.obtenerPorId);
router.get('/profesor/:profesorId', HorarioClaseController.obtenerPorProfesor);
router.get('/grupo/:grupoId', HorarioClaseController.obtenerPorGrupo);
router.get('/dia/:diaSemana', HorarioClaseController.obtenerPorDia);
router.post('/', HorarioClaseController.crear);
router.put('/:id', HorarioClaseController.actualizar);
router.delete('/:id', HorarioClaseController.eliminar);

export default router;
