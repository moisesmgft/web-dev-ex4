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

app.get('/processar-formulario-get', (req, res) => {
    // Obtenha os dados do formulário dos parâmetros de consulta (query params)
    const nome = req.query.nome;
    const email = req.query.email;
  
    // Aqui, você pode processar os dados conforme necessário
    // Por exemplo, você pode exibi-los em uma resposta HTML
    const respostaHTML = `
      <html>
      <head>
          <title>Dados do Formulário</title>
      </head>
      <body>
          <h1>Dados Recebidos do Formulário:</h1>
          <p>Nome: ${nome}</p>
          <p>Email: ${email}</p>
      </body>
      </html>
    `;
  
    res.send(respostaHTML);
});
  

// Rota para servir dados JSON
app.get('/dados-json', (req, res) => {
    fs.readFile(path.join(pastaUploads, 'arquivo.json'), 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler arquivo JSON:', err);
        return res.status(500).json({ success: false, message: 'Erro ao ler o arquivo JSON.' });
      }
  
      try {
        const jsonData = JSON.parse(data);
        res.status(200).json({ success: true, data: jsonData });
      } catch (error) {
        console.error('Erro ao analisar JSON:', error);
        res.status(500).json({ success: false, message: 'Erro ao analisar o arquivo JSON.' });
      }
    });
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
