require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')

const configs = {
    port: [
        process.env.PORT || 3000,
        process.env.PORT_MAIL
    ],
    user: process.env.USER,
    localhost: process.env.HOST,
    password: process.env.PASSWORD,
    host: process.env.HOST_NAME
}


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors({
    origin: configs.host,
    optionsSuccessStatus: 200
}))

app.get('/',(req, res) =>{
    res.send('Funcionando com o cors')
})

app.post('/email',(req, res) =>{

    let emailTo = req.body.email
    let emailID = req.body.id

    const transport = nodemailer.createTransport({
        host:configs.localhost,
        port:configs.port[1],
        secure:true,
        auth:{user: configs.user
            ,pass: configs.password
        }
    })

    transport.sendMail({
        from: configs.user,
        to: emailTo,
        subject:'Sua Pergunta foi respondida!!',
        html:`Acesse o site para ver a <a href="http://${configs.host}/pergunta/${emailID}">RESPOSTA!</a>`
    }).then(info =>{
        res.status(200)
        res.json({
            ok: 'enviado'
        })
    }).catch(err =>{
        res.status(501)
        res.json({
            ok: 'não enviado'
        })

    })

})

app.listen(configs.port[0], _ =>{
    console.log('Servidor de Envio de EMAIl rodando...... '+configs.port[0])
})


