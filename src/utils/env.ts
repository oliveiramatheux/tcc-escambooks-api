import config from '../config'

export const isProduction = (): boolean => {
  return config.applicationEnv === 'PRD'
}
