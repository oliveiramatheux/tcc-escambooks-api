import 'dotenv/config'
import server from './server'
import database from './database'
import config from './config'
import { socketIo } from './client'
import { logger } from './utils'

const serverPort = Number(config.applicationPort) || 8080

database.createConnection()
socketIo(server)

server.listen(serverPort, () => logger.info(`Server up, listening on ${serverPort}`))
