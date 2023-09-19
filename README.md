# Atividade 4 - CES-26

Este documento descreve as rotas e funcionalidades do aplicativo Express. Você encontrará informações sobre como usar cada rota e GIFs exemplificando o uso.

## Rota `/formulario`

A rota `/formulario` serve um formulário HTML que permite o envio de arquivos JSON.


## Rota `/upload-arquivo`

A rota `/upload-arquivo` é usada para fazer upload de um arquivo JSON. Para isso, utiliza o método **POST**.


**Como Usar:**

1. Acesse a rota `/formulario` e siga as etapas acima para enviar um arquivo JSON.

2. O servidor processará o arquivo enviado e exibirá uma mensagem de sucesso ou erro.

![Exemplo de sucesso do /upload-arquivo](assets/success.gif)

Caso você selecione um arquivo que não seja JSON, obterá um erro.

![Exemplo de Uso do /upload-arquivo](assets/error.gif)

## Rota `/processar-formulario-get`

A rota `/processar-formulario-get` processa dados de um formulário enviado via método GET.

**Como Usar:**

1. Preencha o formulário com seu nome e email.

2. Clique no botão "Enviar" para enviar os dados.

3. Os dados serão processados e exibidos em uma página HTML.

![Exemplo de Uso do /processar-formulario-get](assets/get.gif)

## Rota `/dados-json`

A rota `/dados-json` serve os dados JSON enviados anteriormente por meio do formulário.

**Como Usar:**

1. Clique no botão "Carregar Dados JSON".

2. Os dados JSON serão carregados e exibidos na página.

![Exemplo de Uso do /dados-json](assets/load.gif)

## Como usar o app localmente

Para isso, é necessário clonar o repositório. Na raiz do repositório, utilize o comando:

```shell
node app.js
```

No seu navegador insira a url **`http://localhost:3000/formulario`**.
