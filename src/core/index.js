import api from './api'

export default {
  init: async () => {
    const app = await api()
    app.listen(process.env.PORT, () => {
      console.info(`Listen on port: ${process.env.PORT}`)
    })
  },
}
