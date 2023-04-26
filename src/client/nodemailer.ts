import nodemailer from 'nodemailer'
import config from '../config'
import { defaultEmailFrom } from '../config/auth'

const transport = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: `${defaultEmailFrom}`,
      pass: `${config.applicationEmailSenderPass}`
    },
    tls: {
      rejectUnauthorized: false
    }
  }
)

export { transport }
