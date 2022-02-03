# Simple - API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Estado en GitHub Action](https://github.com/psbarrales/simple-api/actions/workflows/api.yml/badge.svg)

Simple API on Koa.JS
## Prerequisites
```
node
docker
```

## 3rd party libraries
* [Koa](https://koajs.com/)

## Folder Structure

    src/
    ├── core               # core build with Koa.JS and 3rd party middleware
    ├── middleware         # custom middleware
    ├── models             # models for database
    ├── routes             # Auto discovery routes folder
    ├── utils              # Utility functions
    ├── views              # Nunjunks template folders
    └── README.md

## Server Running
```
docker-compose up
```
The server will be running on port 3000
* http://localhost:3000

## Adding middleware to `core`
This project auto discover middleware on folder `core`, the file must return by default an `use` or `run` method.
Adding cors for example:

`core/cors.js`
```js
import cors from '@koa/cors'

function use() {
  return cors()
}

export default {
  use,
}
```

## Creating routes
This project auto discover routes on folder `routes`, creating a routing path like the folder from the `*.js` file is in it.

Example:
Creating a file on folder `routes/products/example.js`, like this:
```js
const action = async (ctx) => {
  try {
    ctx.body = 'OK'
  } catch (err) {
    ctx.throw(err)
  }
}

export default {
  method: 'GET',
  route: '/',
  handlers: [action],
}
```
Generate a route `GET` http://localhost:3000/products/

## Status endpoints
`/health`: Get node metrics for prometheus tools

`/metrics`: Get node metrics for prometheus tools

`/up`: Return UP text

`/ping`: Return PONG text

## Testing
### Linter
* `npm run lint`
* `npm run lint:fix`
### Jest
* `npm run test`
* `npm run test:coverage`