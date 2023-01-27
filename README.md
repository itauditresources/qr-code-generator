# VCard Generator

![Lines of code](https://img.shields.io/tokei/lines/github/itauditresources/vcard-generator)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/itauditresources/vcard-generator-backend)
[![Dependency Review](https://github.com/itauditresources/vcard-generator-backend/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/itauditresources/vcard-generator-backend/actions/workflows/dependency-review.yml)
[![CodeQL](https://github.com/itauditresources/vcard-generator-backend/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/itauditresources/vcard-generator-backend/actions/workflows/github-code-scanning/codeql)

This backend repository is build using NodeJS version 18.12 and yarn version 3.3.1

## Builds

run the dev build with `yarn run start:dev`

run production build with `yarn run start:prod`

To initialize the yarn SDK for VS Code run: `yarn dlx @yarnpkg/sdks vscode`

## Dependencies

1. [express](https://www.npmjs.com/package/express)
2. [validator](https://www.npmjs.com/package/validator)
3. [dotenv](https://www.nmpjs.com/package/dotenv)
4. [bcrypt](https://www.nmpjs.com/package/bcrypt)
5. [jose](https://www.nmpjs.com/package/jose) Since _jsonwebtoken_ doesn't offer native typescript support
6. [mongoose](https://www.nmpjs.com/package/mongoose) Might be replaced by the native mongodb driver in production
7. [rate-limiter-flexible](https://www.nmpjs.com/package/rate-limiter-flexible)
8. [redis](https://www.nmpjs.com/package/redis)
9. [connect-redis](https://www.nmpjs.com/package/connect-redis)
10. [@sendgrid/mail](https://www.nmpjs.com/package/sendgrid/mail) During the development stage
11. [helmet](https://www.nmpjs.com/package/helmet)
12. [express-session](https://www.nmpjs.com/package/express-session)

## Dev Dependencies

1. [typescript](https://www.npmjs.com/package/typescript)
2. [nodemon](https://www.npmjs.com/package/nodemon)
3. [mocha](https://www.nmpjs.com/package/mocha)
4. [ts-node](https://www.nmpjs.com/package/ts-node)
5. [eslint](https://www.nmpjs.com/package/eslint)

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
