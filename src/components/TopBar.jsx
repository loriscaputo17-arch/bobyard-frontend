export default function Topbar({ title, onMenuClick }) {
  return (
    <div style={{
      height: 52, padding: '0 20px', borderBottom: '1px solid #E0D8CC',
      background: '#F5F0E8', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onMenuClick} className="lg:hidden" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#111' }}>
          <i className="ti ti-menu-2" style={{ fontSize: 20 }} aria-hidden="true" />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <GhostBtn icon="ti-search" />
        <GhostBtn icon="ti-adjustments-horizontal" label="Filter" labelClass="hidden sm:inline" />
      </div>
    </div>
  )
}

function GhostBtn({ icon, label, labelClass }) {
  return (
    <button style={{
      height: 30, padding: '0 10px', borderRadius: 5, border: 'none',
      background: 'transparent', fontSize: 14, fontWeight: 500,
      color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
      fontFamily: 'Inter, sans-serif',
    }}>
      <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize: 16 }} />
      {label && <span className={labelClass}>{label}</span>}
    </button>
  )
}