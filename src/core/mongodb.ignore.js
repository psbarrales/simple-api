/* eslint-disable node/no-path-concat */
import mongoose from 'mongoose'
import glob from 'glob'

async function run(koa) {
  console.debug('[core] requiring Database')
  try {
    await database()
  } catch (err) {
    console.error(err)
  }
  await models(koa)
}

async function database(
  dbUri,
  attemp = process.env.MAX_DBCONNECTION_ATTEMPT || 5,
) {
  if (!process.env.DATABASE || process.env.DATABASE === 'false') {
    return Promise.resolve()
  }
  if (attemp === (process.env.MAX_DBCONNECTION_ATTEMPT || 5)) {
    console.debug('[mongodb] Connecting to Dabatase')
    /* On connecting */
    mongoose.connection.on('connecting', () => {
      console.debug('[mongodb] Connecting')
    })
    /* On connected */
    mongoose.connection.on('connected', () => {
      console.info('[mongodb] Connected', {
        uri: process.env.DATABASE,
      })
    })
    /* On disconnected */
    mongoose.connection.on('disconnected', () => {
      console.error('[mongodb] Disconnected', {
        uri: process.env.DATABASE,
      })
    })
    /*  */
  }
  return new Promise((resolve, reject) => {
    console.debug('[mongodb] Async connection')
    if (process.env.DEBUG) {
      mongoose.set('debug', process.env.DEBUG)
    }
    if ((dbUri || process.env.DATABASE) && attemp >= 0) {
      try {
        const connection = mongoose.connect(dbUri || process.env.DATABASE, {
          user: process.env.MONGO_INITDB_ROOT_USERNAME,
          pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
          authSource: 'admin',
        })
        mongoose.Promise = global.Promise
        connection.then(resolve).catch(reject)
      } catch (err) {
        console.error(err)
        if (attemp - 1 >= 0) {
          console.warn('[mongodb] Reconnecting in 5s...', {
            attemp: attemp - 1,
          })
          setTimeout(
            () =>
              database(dbUri || process.env.DATABASE, attemp - 1)
                .then(resolve)
                .catch(reject),
            5000,
          )
        } else {
          database(dbUri || process.env.DATABASE, attemp - 1)
        }
      }
    } else {
      const error = new Error('Starting without DATABASE')
      console.error(error.message, error)
      reject(error)
      process.exit(1)
    }
  })
}

async function models() {
  console.debug('[mongodb] models')
  const matches = await new Promise((resolve, reject) => {
    glob(
      `${__dirname}/../models/*`,
      {
        ignore: [
          '**/index.js',
          '**/api.js',
          '**/*.ignore.js',
          '**/*.require.js',
        ],
      },
      (err, matches) => {
        if (err) reject(err)
        else resolve(matches)
      },
    )
  })
  return Promise.all(
    matches.map(async (match) => {
      const model = require(match)
      console.debug(`[mongodb] [model] ${model.default.modelName}`)
    }),
  )
}

export default {
  run,
}
