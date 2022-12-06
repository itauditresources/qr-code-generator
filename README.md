# VCard Generator

![Lines of code](https://img.shields.io/tokei/lines/github/itauditresources/vcard-generator)
![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/itauditresources/vcard-generator)

This monorepo is build using NodeJS version 18.12 and yarn version 3.3.0.

## Builds

run the dev build with `yarn run start:dev`

run production build with `yarn run start:prod`

To initialize the yarn SDK for VS Code run: `yarn dlx @yarnpkg/sdks vscode`

## Dependencies

1. [Express](https://www.npmjs.com/package/express)
2. [Validator](https://www.npmjs.com/package/validator)
3. [Dotenv](https://www.nmpjs.com/package/dotenv)
4. [Bcrypt](https://www.nmpjs.com/package/bcrypt)
5. [Jsonwebtoken](https://www.nmpjs.com/package/jsonwebtoken)
6. [Mongoose](https://www.nmpjs.com/package/mongoose) Might be replaced by the native mongodb driver in production
7. [rate-limiter-flexible](https://www.nmpjs.com/package/rate-limiter-flexible)
8. [Redis](https://www.nmpjs.com/package/redis)
9. [connect-redis](https://www.nmpjs.com/package/connect-redis)
10. [nodemailer](https://www.nmpjs.com/package/nodemailer)
11. [helmet](https://www.nmpjs.com/package/helmet)
12. [express-session](https://www.nmpjs.com/package/express-session)

## Dev Dependencies

1. [Typescript](https://www.npmjs.com/package/typescript)
2. [Nodemon](https://www.npmjs.com/package/nodemon)
3. [Mocha](https://www.nmpjs.com/package/mocha)
4. [TS-Node](https://www.nmpjs.com/package/ts-node)
5. [Eslint](https://www.nmpjs.com/package/eslint)

## Environment

This project uses strong type checking for environmental variables. Be sure to include all the necessary
variables in your secret file. Best practice would be not to store the values in a .env file,
but to use a containerization tool like docker and expose the variables via a direct stream insertion.

Required are:

- APP_NAME

### Server settings

- NODE_ENV
- PORT
- SESSION_SECRET

### DB settings

- MONGODB_USERNAME
- MONGODB_PASSWORD
- MONGODB_DB_NAME
- MONGODB_URI

### Authentication settings

- SALT
- JWT_EXPIRES
- COOKIE_EXPIRES

### REDIS settings

- REDIS_USERNAME
- REDIS_PASSWORD
- REDIS_HOST
- REDIS_PORT

### SMTP settings

- SMTP_HOST
- SMTP_PORT
- SMTP_USERNAME
- SMTP_PASSWORD
