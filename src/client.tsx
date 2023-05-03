import { render } from 'preact'
import { useState } from 'preact/hooks'

export function Button() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
}

const el = document.getElementById('button')
if (el) render(<Button />, el)
