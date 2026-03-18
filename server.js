import express from 'express';
const app = express();
const PORT = 3000;

// Serve os arquivos estáticos (HTML, CSS, JS)
app.use(express.static('./'));

// API que retorna dados simulados
app.get('/api/status', (req, res) => {
  const dados = {
    cpu: Math.floor(Math.random() * 100),         // 0-99%
    ram: (Math.random() * 16).toFixed(1),         // 0-16 GB
    temperatura: Math.floor(Math.random() * 90)   // 0-90 °C
  };
  res.json(dados);
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));