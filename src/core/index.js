import api from './api'

const listen = () => console.info(`Listen on port: ${process.env.PORT}`)

export default {
  init: async () => {
    const app = await api()
    app.listen(process.env.PORT, listen)
  },
}

export { listen as __listen }
