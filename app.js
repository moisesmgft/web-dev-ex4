const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Use o método express.urlencoded para analisar os dados do formulário

// Pasta de destino para uploads
const pastaUploads = path.join(__dirname, 'uploads');

// Função para excluir todos os arquivos na pasta /uploads
function excluirArquivosUploads() {
  fs.readdir(pastaUploads, (err, arquivos) => {
    if (err) {
      console.error('Erro ao listar arquivos na pasta /uploads:', err);
      return;
    }

    for (const arquivo of arquivos) {
      const caminhoArquivo = path.join(pastaUploads, arquivo);

      fs.unlink(caminhoArquivo, (err) => {
        if (err) {
          console.error('Erro ao excluir arquivo:', caminhoArquivo, err);
        } else {
          console.log('Arquivo excluído:', caminhoArquivo);
        }
      });
    }
  });
}

// Exclua os arquivos na pasta /uploads durante a inicialização do servidor
excluirArquivosUploads();

// Configuração do Multer para o destino do upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pastaUploads);
  },
  filename: function (req, file, cb) {
    // Defina um nome padrão para todos os arquivos enviados (por exemplo, "arquivo.json")
    cb(null, 'arquivo.json');
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.json') {
      req.fileValidationError = 'Erro: O arquivo enviado não é um arquivo JSON válido.';
      return cb(null, false);
    }
    cb(null, true);
  },
});

app.get('/formulario', (req, res) => {
  res.sendFile(__dirname + '/public/formulario.html');
});

app.post('/upload-arquivo', upload.single('arquivo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: req.fileValidationError || 'Erro: Nenhum arquivo foi enviado.' });
  }

  res.status(200).json({ success: true, message: 'Sucesso: O arquivo JSON foi enviado com sucesso.' });
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
