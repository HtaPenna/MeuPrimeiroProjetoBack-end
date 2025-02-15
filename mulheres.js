const express = require("express") //Inicia o express
const router = express.Router() //Configurando a primeira parte da rota

const cors = require("cors") //Trazendo o pacote cors (Cross-origin Resource Sharing) que permite conseguir essa API no front-end

const conectaBancoDeDados = require('./bancoDeDados') //Ligando ao arquivo banco de dados
conectaBancoDeDados() //Chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //Iniciando o app
app.use(cors()) //Liberando o acesso do servidor para o front-end
app.use(express.json())
const porta = 3333 //Criando a porta

//GET = pegar
async function mostraMulheres(request, response)
{
    try
    {
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDeDados)
    }
    catch(erro)
    {
        console.log(erro)
    }
}

//POST = publicar
async function criaMulher(request, response) //Quando tiver interação com um serviço externo (no caso MongoDB) usar o "async" (JS assíncrono).
{
    const novaMulher = new Mulher({ //Constante NovaMulher guarda os dados de quando uma requisição de nova mulher for criada.
        nome: request.body.nome,
        img: request.body.img,
        minibio: request.body.minibio,
        citacao: request.body.citacao //Informações a serem salvas do objeto Mulher().
    })

    try
    {
        //Operador await faz parte do JS assíncrono; interação com o MongoDB
        const mulherCriada = await novaMulher.save() //Função save() do mongoose que se comunica com o banco de dados para salvar as informações do objeto Mulher().
        response.status(201).json(mulherCriada) //A função save() guarda o resultado na constante e envia esse objeto na response da request.
    }
    catch(erro)
    {
        console.log(erro)
    } //sintaxe "try/catch" para tratamento de erro.
}

//PATCH = corrigir
async function corrigeMulher(request, response)
{
    try
    {
        const mulherEncontrada = await Mulher.findById(request.params.id) //Função FindById() serve para encontrar um objeto pelo id.
        if (request.body.nome) //Se for uma requisão para alterar o nome...
        {
            mulherEncontrada.nome = request.body.nome //O nome do objeto mulherEncontrada será igual ao nome escrito no corpo da requisição.
        }

        if (request.body.img)
        {
            mulherEncontrada.img = request.body.img
        }

        if (request.body.minibio)
        {
            mulherEncontrada.minibio = request.body.minibio
        }

        if (request.body.citacao)
        {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizada = await mulherEncontrada.save()
        response.json(mulherAtualizada)
    }
    catch (erro)
    {
        console.log(erro)
    }
}

//DELETE = deletar
async function deletaMulher(request, response)
{
    try
    {
        await Mulher.findByIdAndDelete(request.params.id) //Função findByIdAndDelete encontra a mulher requisitada para deletar e deleta.
        response.json({Menssagem:'Mulher deletada com sucesso!'})
    }
    catch(erro)
    {
        console.log(erro)
    }
}

//Porta
function mostraPorta()
{
    console.log("Servidor criado e rodando na porta ", porta)
}

//Rotas
app.use(router.get('/mulheres', mostraMulheres)) //Configuração rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //Configuração rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //Configuração rota PATCH
app.use(router.delete('/mulheres/:id', deletaMulher))
app.listen(porta, mostraPorta) //Ouvindo a porta
