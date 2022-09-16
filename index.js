
import express from 'express'

import staffRouter from './router/staffRouter'
import staffController from './controller/staffController'
import server from './server.js'

const app = express()

app.use(staffRouter)


app.use(server)