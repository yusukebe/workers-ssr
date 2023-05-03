import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import render from 'preact-render-to-string'
import App, { getData } from './app'
import type { Data, Variables } from './types'

const app = new Hono<{ Variables: Variables }>()

app.get('/assets/*', serveStatic({ root: './' }))

app.get('/', async (c) => {
  c.set('message', 'Hello')
  const data = await getData<Data>(c)
  const stream = render(
    <html>
      <head>
        <script type='module' src='/assets/client.js'></script>
      </head>
      <body>
        <App data={data} />
      </body>
    </html>
  )
  return c.html(stream)
})

export default app
