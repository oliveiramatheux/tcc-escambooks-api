import { socketInstance } from '../client'
import { logger } from '../utils'

const emitEvent = (name: string, options: unknown) => {
  if (!socketInstance) return
  try {
    socketInstance.emit(name, options)
  } catch (error) {
    logger.info(`Error when emit event: ${error}`)
  }
}

export {
  emitEvent
}
