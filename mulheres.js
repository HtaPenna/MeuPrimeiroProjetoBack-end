const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: "Agatha de Sousa Peña",
        img: "https://media.licdn.com/dms/image/D4D03AQHKsJQe6bzm3A/profile-displayphoto-shrink_200_200/0/1703775936001?e=1709164800&v=beta&t=9B94yMgpCi8KMqEjniBdgSNJeNk_8r_uZlAvIp7p3OY",
        minibio: "Estudante de Desenvolvimento de Sistemas"
    },
    
    {
        nome: "Cintia Ap. de Sousa Peña",
        img: "https://media.licdn.com/dms/image/C4D03AQEpymG_Vjpvfw/profile-displayphoto-shrink_100_100/0/1628612439736?e=1709164800&v=beta&t=GzYFkbt0RLbjMRfW1FG5iMjOaXHMszrnkvalYVjNOBw",
        minibio: "Promotora L'Òreal"
    }
]

function mostraMulheres(resquest, response)
{
    response.json(mulheres)
}

function mostraPorta()
{
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get("/mulheres", mostraMulheres))
app.listen(porta, mostraPorta)