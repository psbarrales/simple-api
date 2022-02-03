import { koaSwagger } from 'koa2-swagger-ui'
import swagger from 'swagger/index'

async function use(koa) {
  if (process.env.DEBUG || process.env.NODE_ENV !== 'production') {
    console.debug('[core] requiring Swagger')
    /* Swagger */
    const swaggerSpec = await swagger()
    koa.swagger = swaggerSpec
    return koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        oauth2RedirectUrl: 'http://localhost:8080/auth/redirect',
        spec: swaggerSpec,
        jsonEditor: true,
      },
      hideTopbar: true,
    })
  }
}

export default {
  use,
}
