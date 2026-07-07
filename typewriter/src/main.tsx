import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Typewriter from './Typewriter'
import Cursor from './Cursor'

const typewriterRoot = document.getElementById('typewriter-root')
if (typewriterRoot) {
  createRoot(typewriterRoot).render(
    <StrictMode>
      <Typewriter />
    </StrictMode>,
  )
}

const cursorRoot = document.getElementById('cursor-root')
if (cursorRoot) {
  createRoot(cursorRoot).render(
    <StrictMode>
      <Cursor />
    </StrictMode>,
  )
}
