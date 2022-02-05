import views from 'core/views'
import koaViews from 'koa-views'

jest.mock('koa-views', () => jest.fn())

test('core: views and views.use should be defined', () => {
  expect(views).toBeDefined()
  expect(views.use).toBeDefined()
})

test('core: views.use should call koa-views middleware', () => {
  views.use()
  expect(koaViews).toHaveBeenCalled()
})
