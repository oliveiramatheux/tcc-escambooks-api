import http from 'http'
import express from 'express'
import router from './routes'
import cors from 'cors'
import { errors } from 'celebrate'
import { asyncHandlerError } from './middlewares/asyncHandlerError'
import { readFileSync } from 'fs'
import swagger from 'swagger-ui-express'
import jsYaml from 'js-yaml'

const swaggerDocument = jsYaml.load(readFileSync('src/swagger.yaml', 'utf-8'))

const server = express()

server.use(cors())
server.use(express.json())
server.use('/api', router)
server.use('/docs', swagger.serve, swagger.setup(swaggerDocument))
server.use(errors())
server.use(asyncHandlerError)

const httpServer = http.createServer(server)

export default httpServer
