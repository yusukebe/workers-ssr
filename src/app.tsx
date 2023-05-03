import type { Context } from 'hono'
import type { Data, Variables } from './types'

export default function App(props: { data: Data }) {
  return (
    <>
      <p>
        Hello <b>{props.data.name}</b>!
      </p>
      <div id='button'></div>
    </>
  )
}

export async function getData<T>(c: Context<{ Variables: Variables }>) {
  const userId = c.req.query('userId') || '1'
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  const { name } = await res.json<{ name: string }>()
  return {
    name,
    message: c.get('message'),
  }
}
