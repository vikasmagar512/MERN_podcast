export const dbConfig = {
  secret: 'SomeRandomSecretString',
  //db: 'mongodb://localhost:auth/auth',
  db: 'mongodb://localhost/auth',
};

export const emailConfig = {
  service: 'Gmail',
  auth: {
    user: 'your_gmail@gmail.com',
    pass: 'your_gmail_Password',
  },
};

export const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://dimitrimikadze.com:3000' : 'http://localhost:3000';
