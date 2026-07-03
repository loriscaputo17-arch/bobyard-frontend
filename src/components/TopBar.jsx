import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Comments',  path: '/comments' },
  { text: 'Documents', path: null },
  { text: 'Team',      path: null },
]

export default function Topbar({ role, setRole }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavigate = (path) => {
    if (path) { navigate(path); setMobileMenuOpen(false) }
  }

  return (
    <>
      <header style={{
        height: 56, background: '#fff', borderBottom: '1px solid #F0F0F0',
        display: 'flex', alignItems: 'center', padding: '0 16px',
        gap: 16, position: 'sticky', top: 0, zIndex: 10, flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, background: '#ef4000', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 18 18" fill="none" width={16} height={16}>
              <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#fff"/>
              <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#fff"/>
              <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#fff"/>
              <rect x="10" y="10" width="3" height="6" rx="1" fill="#fff"/>
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#111', letterSpacing: '-0.02em' }}>Bobyard</span>
        </div>

        {/* Nav — desktop */}
        <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 2, flex: 1 }}>
          {NAV.map(item => (
            <button key={item.text} onClick={() => handleNavigate(item.path)} style={{
              padding: '6px 14px', borderRadius: 8, border: 'none',
              fontSize: 13, fontWeight: 500,
              cursor: item.path ? 'pointer' : 'default',
              fontFamily: 'Inter, sans-serif',
              background: location.pathname === item.path ? '#f4f4f4' : 'transparent',
              color: location.pathname === item.path ? '#111' : item.path ? '#666' : '#ccc',
            }}>
              {item.text}
            </button>
          ))}
        </nav>

        <div className="flex md:hidden" style={{ flex: 1 }} />

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button className="hidden md:flex" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #F0F0F0', background: '#fff', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#888' }}>
            <i className="ti ti-search" style={{ fontSize: 15 }} />
          </button>

          <div style={{ display: 'flex', background: '#f4f4f4', borderRadius: 8, padding: 3, gap: 2 }}>
            {['Admin', 'User'].map(r => (
              <button key={r} onClick={() => setRole(r.toLowerCase())} style={{
                padding: '5px 10px', borderRadius: 6, border: 'none',
                fontSize: 12, fontWeight: 500, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                background: role === r.toLowerCase() ? '#fff' : 'transparent',
                color: role === r.toLowerCase() ? '#111' : '#888',
                boxShadow: role === r.toLowerCase() ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}>
                {r}
              </button>
            ))}
          </div>

          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
            A
          </div>

          <button className="flex md:hidden" onClick={() => setMobileMenuOpen(o => !o)}
            style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #F0F0F0', background: '#fff', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#888' }}>
            <i className={`ti ${mobileMenuOpen ? 'ti-x' : 'ti-menu-2'}`} style={{ fontSize: 16 }} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" style={{
          position: 'sticky', top: 56, zIndex: 9,
          background: '#fff', borderBottom: '1px solid #F0F0F0',
          padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {NAV.map(item => (
            <button key={item.text} onClick={() => handleNavigate(item.path)} style={{
              padding: '10px 14px', borderRadius: 8, border: 'none', textAlign: 'left',
              fontSize: 14, fontWeight: 500, cursor: item.path ? 'pointer' : 'default',
              fontFamily: 'Inter, sans-serif',
              background: location.pathname === item.path ? '#f4f4f4' : 'transparent',
              color: location.pathname === item.path ? '#111' : item.path ? '#444' : '#ccc',
            }}>
              {item.text}
            </button>
          ))}
        </div>
      )}
    </>
  )
}