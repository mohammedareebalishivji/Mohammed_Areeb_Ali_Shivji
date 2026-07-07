import { useState, useEffect, useRef } from 'react'

export default function Cursor() {
  const [isTouch] = useState(() => 'ontouchstart' in window)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  useEffect(() => {
    if (isTouch) return

    window.addEventListener('mousemove', (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }, { passive: true })

    function tick() {
      const m = mouseRef.current
      const p = posRef.current
      p.x += (m.x - p.x) * 0.12
      p.y += (m.y - p.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${p.x}px, ${p.y}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [isTouch])

  useEffect(() => {
    if (isTouch || !ringRef.current) return

    const ring = ringRef.current
    const enter = () => {
      ring.style.width = '48px'
      ring.style.height = '48px'
      ring.style.margin = '-24px 0 0 -24px'
      ring.style.borderColor = '#00e5ff'
    }
    const leave = () => {
      ring.style.width = '32px'
      ring.style.height = '32px'
      ring.style.margin = '-16px 0 0 -16px'
      ring.style.borderColor = '#fff'
    }

    document.querySelectorAll('a, button, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      document.querySelectorAll('a, button, input, textarea').forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [isTouch])

  if (isTouch) return null

  const base: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0,
    pointerEvents: 'none', zIndex: 9999,
    willChange: 'transform',
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          ...base,
          width: 6, height: 6,
          background: '#fff', borderRadius: '50%',
          mixBlendMode: 'difference',
          margin: '-3px 0 0 -3px',
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...base,
          width: 32, height: 32,
          border: '1.5px solid #fff', borderRadius: '50%',
          mixBlendMode: 'difference',
          margin: '-16px 0 0 -16px',
          transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease',
        }}
      />
    </>
  )
}
