const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// Verificação de extensão personalizada
function verificaExtensao(req, file, cb) {
  const extensoesPermitidas = ['json'];
  const extensao = file.originalname.split('.').pop();
  
  if (extensoesPermitidas.includes(extensao)) {
    cb(null, true); // Extensão permitida
  } else {
    cb(new Error('Erro: O arquivo enviado não é um arquivo JSON válido.'), false); // Extensão não permitida
  }
}

// Configuração do Multer com a verificação de extensão
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: verificaExtensao,
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/formulario.html');
});

app.post('/upload-arquivo', upload.single('arquivo'), (req, res) => {
    if (req.file) {
      // Em caso de sucesso, envie uma mensagem de sucesso como resposta JSON
      res.json({ success: true, message: 'Sucesso: O arquivo JSON foi enviado com sucesso.' });
    } else {
      // Em caso de erro, envie uma mensagem de erro como resposta JSON
      res.status(400).json({ success: false, message: 'Erro: O arquivo enviado não é um arquivo JSON válido.' });
    }
  });

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
