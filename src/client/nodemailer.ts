import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'
import config from '../config'

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: `${config.applicationKeySendGridApi}`
  })
)

export { transport }
