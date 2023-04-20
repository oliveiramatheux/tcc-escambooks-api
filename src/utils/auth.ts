import { generateToken } from '../services/auth'

const DEFAULT_USER_ID = '610970b1b3000dc0e505ee70'

const generateDefaultToken = generateToken({ id: DEFAULT_USER_ID })

export { generateDefaultToken }
