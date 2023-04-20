const {
  APP_PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  APP_TOKEN_SECRET,
  APP_KEY_GOOGLE_BOOKS_API,
  APP_KEY_SENDGRID_API,
  APP_FRONT_URL
} = process.env

export default {
  applicationPort: APP_PORT,
  databaseHost: DB_HOST,
  databaseUser: DB_USER,
  databasePassword: DB_PASSWORD,
  databaseName: DB_NAME,
  applicationTokenSecret: APP_TOKEN_SECRET,
  applicationKeyGoogleBooksApi: APP_KEY_GOOGLE_BOOKS_API,
  applicationKeySendGridApi: APP_KEY_SENDGRID_API,
  applicationFrontUrl: APP_FRONT_URL
}
