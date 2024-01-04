//*Aqui possui toda a estrutura de criação do servidor e as informações de configuração da rota GET/ola
const express = require("express")
const router = express.Router() //*Configuração da rota

const app = express()
const porta = 3333

function mostraOla(request, response) //*Parâmetros para definir requisição e resposta
{
response.send("Olá, mundo!") //*Conjunto de instruções que responde à requisição
}

function mostraPorta()
{
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/ola', mostraOla)) //*Responde o verbo GET na rota /ola e chama a função mostraOla
app.listen(porta, mostraPorta)