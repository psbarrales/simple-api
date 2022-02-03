import path from 'path'
import views from 'koa-views'

function use() {
  console.debug('[core] requiring Views')
  const viewsPath = path.join(__dirname, '/../views')
  return views(viewsPath, {
    map: {
      html: 'nunjucks',
      njk: 'nunjucks',
    },
  })
}

export default {
  use,
}
