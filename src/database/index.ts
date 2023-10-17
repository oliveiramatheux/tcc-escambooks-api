import mongoose from 'mongoose'
import config from '../config'
import { logger, isProduction } from '../utils'

const buildDatabaseUrlConnection = () => {
  if (isProduction()) return `mongodb+srv://${config.databaseUser}:${config.databasePassword}@${config.databaseHost}/${config.databaseName}?retryWrites=true&w=majority`
  return `mongodb://${config.databaseHost}/${config.databaseName}`
}

mongoose.createConnection = (): any => {
  if (!mongoose.connection.readyState) {
    mongoose.set('strictQuery', false)
    return mongoose.connect(buildDatabaseUrlConnection())
      .then(() => logger.info('Connected to MongoDB'))
      .catch(() => setTimeout(mongoose.createConnection, 3000))
  }
}

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected...')
  return setTimeout(mongoose.createConnection, 10000)
})

export default mongoose
