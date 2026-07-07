import { useState, useCallback, useEffect } from 'react'

const STRINGS = [
  'Software Engineer',
  'AI Engineer',
  'Full Stack Developer',
  'Data Scientist',
  'ML Engineer',
]

const TYPING_SPEED = 80
const DELETING_SPEED = 50
const PAUSE = 2000

const style: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'block',
    color: '#d4a853',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    fontWeight: 500,
    letterSpacing: '0.04em',
    marginTop: '1rem',
    minHeight: '1.6em',
  },
  cursor: {
    display: 'inline-block',
    marginLeft: '2px',
    animation: 'tw-blink 0.7s steps(1) infinite',
    color: '#d4a853',
    fontWeight: 300,
  },
}

export default function Typewriter() {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const tick = useCallback(() => {
    const current = STRINGS[index]
    if (!deleting) {
      if (display.length < current.length) {
        setDisplay(current.slice(0, display.length + 1))
        return
      }
      setDeleting(true)
      return
    }
    if (display.length > 0) {
      setDisplay(display.slice(0, -1))
      return
    }
    setDeleting(false)
    setIndex(i => (i + 1) % STRINGS.length)
  }, [display, index, deleting])

  useEffect(() => {
    const current = STRINGS[index]
    if (!deleting && display.length === current.length) {
      const id = setTimeout(tick, PAUSE)
      return () => clearTimeout(id)
    }
    const speed = deleting ? DELETING_SPEED : TYPING_SPEED
    const id = setTimeout(tick, speed)
    return () => clearTimeout(id)
  }, [tick, index, deleting, display.length])

  return (
    <span style={style.wrapper}>
      <span style={{ opacity: 0.7, marginRight: '0.4em' }}>&gt;</span>
      <span id="typewriter-text">{display}</span>
      <span style={style.cursor}>|</span>
    </span>
  )
}
