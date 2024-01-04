const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response)
{
    response.json({
        nome: "Agatha de Sousa Peña",
        img: "https://media.licdn.com/dms/image/D4D03AQHKsJQe6bzm3A/profile-displayphoto-shrink_800_800/0/1703775936001?e=1709164800&v=beta&t=H5l-H0vUvKQi4G_WJdVSiWDqVIfXuaVvaoXpEsmOkW4",
        minibio: "Estudante da ETEC"
    })
}

function mostraPorta()
{
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostraPorta)