import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}).on('error', (error) => {
  console.error('Error al iniciar el servidor:', error);
  process.exit(1);
});
