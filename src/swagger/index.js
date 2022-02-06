import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'

const pkginfo = require('../../package.json')

// Options for the swagger specification
async function options() {
  return {
    // Import the swagger definitions
    definition: {
      info: {
        title: pkginfo.title,
        description: pkginfo.description,
        version: pkginfo.version,
        contact: pkginfo.author,
      },
      consumes: ['application/x-www-form-urlencoded', 'application/json'],
      servers: [],
      produces: ['application/json'],
      components: {
        securitySchemes: {
          OAuth2: {
            type: 'oauth2',
            description:
              'For more information, see https://developers.getbase.com/docs/rest/articles/oauth2/requests',
            flows: {
              authorizationCode: {
                authorizationUrl: '/v1/login/oauth/authorize',
                scopes: ['swagger:admin'],
              },
              password: {
                tokenUrl: '/v1/login/oauth/token',
                scopes: ['swagger:admin'],
              },
            },
          },
        },
      },
    },
    // Path to the API specs
    apis: [
      path.join(__dirname, '../routes/**/*.js'),
      path.join(__dirname, '../tasks/**/*.js'),
    ],
  }
}

export default async () => {
  return swaggerJsdoc(await options())
}

export { options as __options }
