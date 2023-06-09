import mongoose from 'mongoose'
import config from '../config'

const databaseUrlConnection = `mongodb+srv://${config.databaseUser}:${config.databasePassword}@${config.databaseHost}/${config.databaseName}?retryWrites=true&w=majority`

mongoose.createConnection = (): any => {
  if (!mongoose.connection.readyState) {
    mongoose.set('strictQuery', false)
    return mongoose.connect(databaseUrlConnection)
      .then(() => console.log('Connected to MongoDB'))
      .catch(() => setTimeout(mongoose.createConnection, 3000))
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected...')
  return setTimeout(mongoose.createConnection, 10000)
})

export default mongoose
