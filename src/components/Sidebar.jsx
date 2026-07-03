const NAV = [
  { label: 'Workspace', items: [
    { icon: 'ti-layout-dashboard', text: 'Dashboard', page: 'dashboard' },
    { icon: 'ti-ruler-measure',    text: 'Takeoffs',  page: null },
    { icon: 'ti-calculator',       text: 'Estimates', page: null },
  ]},
  { label: 'Project', items: [
    { icon: 'ti-message-circle',   text: 'Comments',  page: 'comments' },
    { icon: 'ti-file-description', text: 'Documents', page: null },
    { icon: 'ti-users',            text: 'Team',      page: null },
  ]},
]

export default function Sidebar({ role, setRole, open, onClose, activePage, onNavigate }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-30 flex flex-col
        lg:static lg:z-auto lg:translate-x-0
        transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `} style={{ width: 210, background: '#f5f0e8', borderRight: '1px solid #E0D8CC' }}>

        <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E0D8CC' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 30, height: 30, background: '#ef4000', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 18 18" fill="none" width={18} height={18}>
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#fff"/>
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#fff"/>
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#fff"/>
                <rect x="10" y="10" width="3" height="6" rx="1" fill="#fff"/>
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#000', letterSpacing: '-0.01em' }}>Bobyard</span>
          </div>
          <button onClick={onClose} className="lg:hidden" style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>
            <i className="ti ti-x" style={{ fontSize: 18 }} />
          </button>
        </div>

        <nav style={{ padding: '14px 8px', flex: 1 }}>
          {NAV.map(group => (
            <div key={group.label} style={{ marginBottom: 22 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 8px', marginBottom: 6 }}>
                {group.label}
              </p>
              {group.items.map(item => (
                <div
                  key={item.text}
                  onClick={() => item.page && onNavigate(item.page)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px', borderRadius: 6, marginBottom: 2,
                    fontSize: 14,
                    cursor: item.page ? 'pointer' : 'default',
                    background: activePage === item.page ? '#ef4000' : 'transparent',
                    color: activePage === item.page ? '#fff' : item.page ? '#555' : '#bbb',
                    opacity: item.page ? 1 : 0.5,
                  }}
                >
                  <i className={`ti ${item.icon}`} aria-hidden="true" style={{ fontSize: 15, width: 16 }} />
                  {item.text}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: '12px 8px', borderTop: '1px solid #E0D8CC' }}>
          <p style={{ fontSize: 10, fontWeight: 500, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, padding: '0 4px' }}>
            View as
          </p>
          <div style={{ background: '#1a1a1a', borderRadius: 18, padding: 8, display: 'flex', gap: 3 }}>
            {['admin', 'user'].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: '6px 0', borderRadius: 12, border: 'none',
                fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                background: role === r ? '#ef4000' : 'transparent',
                color: role === r ? '#fff' : '#555',
              }}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}