import 'dotenv/config'
import server from './server'
import database from './database'
import config from './config'

const serverPort = Number(config.applicationPort) || 8080

database.createConnection()

server.listen(serverPort, () => console.log(`Server up, listening on ${serverPort}`))
