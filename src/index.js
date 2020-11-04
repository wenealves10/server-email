require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const configs = {
    port: [
        process.env.PORT_SERVER || 3000,
        process.env.PORT_MAIL
    ],
    user: process.env.USER,
    localhost: process.env.HOST,
    password: process.env.PASSWORD,
}


