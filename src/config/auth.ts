import applicationTokenSecret from '../config'

const authSecret = {
  secret: `${applicationTokenSecret}`
}

const defaultEmailFrom = 'tccescambooks@gmail.com'

export { authSecret, defaultEmailFrom }
