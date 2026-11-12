import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from './routes/Auth.routes.js';
import usuarioRoutes from './routes/Usuario.routes.js';
import avisoRoutes from './routes/Aviso.routes.js';
import bloqueHorarioRoutes from './routes/BloqueHorario.routes.js';
import profesorRoutes from './routes/Profesor.routes.js';
import materiaRoutes from './routes/Materia.routes.js';
import profesorDiaDisponibleRoutes from './routes/ProfesorDiaDisponible.routes.js';
import estadoColegioRoutes from './routes/EstadoColegio.routes.js';
import eventoRoutes from './routes/Evento.routes.js';
import grupoRoutes from './routes/Grupo.routes.js';
import horarioClaseRoutes from './routes/HorarioClase.routes.js';
import horarioEspecialRoutes from './routes/HorarioEspecial.routes.js';
import profesorMateriaRoutes from './routes/ProfesorMateria.routes.js';
import registroCambioRoutes from './routes/RegistroCambio.routes.js';
import { authRequired } from './middlewares/auth.middleware.js';
import { sendError } from './controllers/_utils.js';

const app = express();

// Render pone un proxy delante; necesario para que req.secure / cookies secure funcionen
app.set('trust proxy', 1);

// CORS_ORIGIN admite varios orígenes separados por coma
const allowedOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);

app.use('/usuarios', authRequired, usuarioRoutes);
app.use('/profesores', authRequired, profesorRoutes);
app.use('/materias', authRequired, materiaRoutes);
app.use('/profesor-materia', authRequired, profesorMateriaRoutes);
app.use('/profesor-dias-disponibles', authRequired, profesorDiaDisponibleRoutes);
app.use('/grupos', authRequired, grupoRoutes);
app.use('/bloques-horario', authRequired, bloqueHorarioRoutes);
app.use('/horario-clases', authRequired, horarioClaseRoutes);
app.use('/horarios-especiales', authRequired, horarioEspecialRoutes);
app.use('/registro-cambios', authRequired, registroCambioRoutes);
app.use('/avisos', authRequired, avisoRoutes);
app.use('/eventos', authRequired, eventoRoutes);
app.use('/estados-colegio', authRequired, estadoColegioRoutes);

app.use((req, res) => {
    res.status(404).json({ ok: false, mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// Errores fuera de los controladores (p. ej. JSON mal formado en el body)
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') err.statusCode = 400;
    sendError(res, err);
});

export default app;
