import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'
import config from '../config'
import { logger } from '../utils'

let socketInstance: Server

export const socketIo = (server: HttpServer) => {
  const socketIo = new Server(server, {
    cors: {
      origin: config.applicationFrontUrl,
      credentials: false
    }
  })

  socketIo.on('connection', (socket) => {
    logger.info(`Someone connected -> ${socket.id}`)
  })

  socketInstance = socketIo
}

export { socketInstance }
