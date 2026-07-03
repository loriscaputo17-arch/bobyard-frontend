import { useState } from 'react'
import { editComment, deleteComment } from '../api/comments'

const AVATAR_COLORS = [
  { bg: '#EEF2FF', color: '#4F46E5' },
  { bg: '#FEF3C7', color: '#D97706' },
  { bg: '#DCFCE7', color: '#16A34A' },
  { bg: '#FCE7F3', color: '#DB2777' },
  { bg: '#E0F2FE', color: '#0284C7' },
  { bg: '#F3E8FF', color: '#9333EA' },
]

function getAvatar(name) {
  const idx = (name?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length
  const initials = name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? '?'
  return { initials, ...AVATAR_COLORS[idx] }
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

export default function CommentCard({ comment, role, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(comment.text)
  const [saving, setSaving] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [hovered, setHovered] = useState(false)
  const av = getAvatar(comment.author)
  const isAdmin = role === 'admin'

  const handleSave = async () => {
    if (!text.trim() || text === comment.text) { setEditing(false); return }
    setSaving(true)
    const updated = await editComment(comment.id, text.trim())
    onUpdate(updated)
    setEditing(false)
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirm('Delete this comment?')) return
    await deleteComment(comment.id)
    onDelete(comment.id)
  }

  return (
    <>
      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, cursor: 'zoom-out' }}>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-x" style={{ fontSize: 18 }} />
          </button>
          <img src={lightbox} alt="" onClick={e => e.stopPropagation()} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 8, touchAction: 'pinch-zoom' }} />
        </div>
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff', borderRadius: 16, padding: '18px 20px',
          boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.06)',
          border: '1px solid #F0F0F0',
          transition: 'box-shadow 0.2s',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: av.bg, color: av.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              {av.initials}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111', display: 'flex', alignItems: 'center', gap: 6 }}>
                {comment.author}
                {/*{comment.author === 'Admin' && (
                  <span style={{ marginLeft: 'auto',fontSize: 10, fontWeight: 600, background: '#111', color: '#fff', padding: '2px 6px', borderRadius: 4 }}>Admin</span>
                )}*/}
              </div>
              <div className="leading-4" style={{ fontSize: 12, color: '#999', marginTop: 1 }}>{formatDate(comment.created_at)}</div>
            </div>
          </div>

          {/* Admin actions */}
          {isAdmin && (
            <div style={{ display: 'flex', gap: 4, opacity: hovered ? 1 : 0, transition: 'opacity 0.15s' }}>
              <ActionBtn icon="ti-edit" onClick={() => { setEditing(true); setText(comment.text) }} />
              <ActionBtn icon="ti-trash" danger onClick={handleDelete} />
            </div>
          )}
        </div>

        {/* Body */}
        {editing ? (
          <div style={{ marginBottom: 12 }}>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              autoFocus rows={3}
              style={{ width: '100%', background: '#FAFAFA', border: '1px solid #E5E5E5', borderRadius: 10, color: '#111', fontSize: 14, padding: '10px 12px', resize: 'none', fontFamily: 'Inter, sans-serif', outline: 'none', lineHeight: 1.6 }}
            />
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 8 }}>
              <button onClick={() => setEditing(false)} style={{ padding: '6px 12px', borderRadius: 7, border: 'none', background: 'transparent', fontSize: 12, color: '#999', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ padding: '6px 14px', borderRadius: 7, border: 'none', background: '#111', fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: 14, color: '#333',textAlign: 'left', lineHeight: 1.7, marginBottom: 12 }}>{comment.text}</p>
        )}

        {/* Images */}
        {comment.images?.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: comment.images.length === 1 ? '1fr' : '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {comment.images.map((src, i) => (
              <img key={i} src={src} alt="" onClick={() => setLightbox(src)}
                style={{ width: 'auto', maxHeight: 200, objectFit: 'cover', borderRadius: 10, cursor: 'zoom-in', display: 'block' }}
                onError={e => e.target.style.display = 'none'} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 10, borderTop: '1px solid #F5F5F5' }}>
          <StatBtn icon="ti-heart" count={comment.likes} />
          <StatBtn icon="ti-message" label="Reply" />
        </div>
      </div>
    </>
  )
}

function ActionBtn({ icon, onClick, danger }) {
  const [hover, setHover] = useState(false)
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: hover ? (danger ? '#FEF2F2' : '#F5F5F5') : 'transparent', color: hover ? (danger ? '#DC2626' : '#111') : '#CCC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <i className={`ti ${icon}`} style={{ fontSize: 15 }} />
    </button>
  )
}

function StatBtn({ icon, count, label }) {
  const [hover, setHover] = useState(false)
  return (
    <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, cursor: 'pointer', color: hover ? '#111' : '#999', transition: 'color 0.15s' }}>
      <i className={`ti ${icon}`} style={{ fontSize: 14 }} />
      {count ?? label}
    </span>
  )
}