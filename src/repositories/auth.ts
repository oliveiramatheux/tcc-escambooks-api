import { User, IUserResponse } from '../models'
import { clientEmail } from '../client'

export interface ISendEmail {
  from: string
  subject: string
  html: string
}

const authenticateUserByEmailAndPassword = async (email: string) => {
  const user = (await User.findOne({ email }).select(
    '+password'
  )) as unknown as IUserResponse
  console.log(user)
  return user
}

const sendEmail = async (
  user: IUserResponse,
  { from, subject, html }: ISendEmail
) => {
  clientEmail.sendMail({
    from,
    to: user.email,
    subject,
    html
  })
}

export { authenticateUserByEmailAndPassword, sendEmail }
