import fs from 'fs'

const contentTemplateEmailConfirmation = fs.readFileSync('src/services/templates/emailConfirmation.html', 'utf-8')
const contentTemplateResetPasswordConfirmation = fs.readFileSync('src/services/templates/resetPasswordConfirmation.html', 'utf-8')
const contentTemplateResetPasswordFeedback = fs.readFileSync('src/services/templates/resetPasswordFeedback.html', 'utf-8')

export {
  contentTemplateEmailConfirmation,
  contentTemplateResetPasswordConfirmation,
  contentTemplateResetPasswordFeedback
}
