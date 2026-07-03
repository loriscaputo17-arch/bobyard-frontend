import { useState, useEffect } from 'react';
import { deleteComment, editComment} from '../api/comments';
import { Avatar } from './AddComment'

const AVATAR_COLORS = [
  { bg: '#DBEAFE', color: '#1E40AF' },
  { bg: '#EDE9FE', color: '#6D28D9' },
  { bg: '#D1FAE5', color: '#065F46' },
  { bg: '#FEE2E2', color: '#991B1B' },
  { bg: '#FEF3C7', color: '#92400E' },
  { bg: '#FCE7F3', color: '#9D174D' },
]

function getAvatar(name) {
  const idx = (name?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length
  const initials = name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? '?'
  return { initials, ...AVATAR_COLORS[idx] }
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function CommentCard({comment, role, onUpdate, onDelete}) {
    const [editing, setEditing] = useState(false)
    const [text, setText] = useState(comment.text)
    const [saving, setSaving] = useState(false)
    const av = getAvatar(comment.author)
    const isAdmin = role === 'admin'
    const [lightbox, setLightbox] = useState(null);

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
    <div className="group" style={{ background: '#fff', borderRadius: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16, transition: 'border-color 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#C8C0B4'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#E0D8CC'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Avatar initials={av.initials} bg={av.bg} color={av.color} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#111', textAlign: "left", }}>
              {comment.author}
              {comment.author === 'Admin' && (
                <span style={{ fontSize: 10, fontWeight: 500, background: '#111', color: '#F5F0E8', padding: '2px 6px', borderRadius: 3, marginLeft: 6 }}>Admin</span>
              )}
            </div>
            <div className="leading-3" style={{ fontSize: 11, color: '#AAA', marginTop: '0', }}>{formatDate(comment.created_at)}</div>
          </div>
        </div>

        {isAdmin && (
          <div style={{ display: 'flex', gap: 3 }} className="card-actions">
            <ActionBtn icon="ti-edit" onClick={() => { setEditing(true); setText(comment.text) }} />
            <ActionBtn icon="ti-trash" danger onClick={handleDelete} />
          </div>
        )}
      </div>

      {editing ? (
        <div style={{ marginBottom: 10 }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            autoFocus
            rows={3}
            style={{
              width: '100%', background: '#F5F0E8', border: '1px solid #E0D8CC',
              borderRadius: 6, color: '#111', fontSize: 13, padding: '8px 10px',
              resize: 'none', fontFamily: 'Inter, sans-serif', outline: 'none', lineHeight: 1.5,
            }}
          />
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 6 }}>
            <button onClick={() => setEditing(false)} style={{ height: 26, padding: '0 10px', borderRadius: 4, border: 'none', background: 'transparent', fontSize: 11, color: '#999', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving} style={{ height: 26, padding: '0 12px', borderRadius: 4, border: 'none', background: '#111', fontSize: 11, fontWeight: 600, color: '#F5F0E8', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      ) : (
        <p style={{ fontSize: 13, color: '#444', lineHeight: 1.65, marginBottom: 10, textAlign: 'left' }}>{comment.text}</p>
      )}

      {comment.images?.length > 0 && (
        <div 
        style={{ display: 'grid', 
        gridTemplateColumns: comment.images.length === 1 ? '1fr' : '1fr 1fr', gap: 6, marginBottom: 10 }}>
          {comment.images.map((src, i) => (
            <img key={i} 
            src={src} alt="" 
            style={{ width: 'auto', maxHeight: 150, 
                objectFit: 'cover', borderRadius: 7, background: '#F5F0E8', display: 'block', cursor: 'zoom-in' }}
                onClick={() => setLightbox(src)}

              onError={e => e.target.style.display = 'none'} />
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <StatBtn icon="ti-heart" count={comment.likes} active />
        {isAdmin
          ? <StatBtn icon="ti-message" label="Reply" />
          : <StatBtn icon="ti-message" label="Reply" />
        }
      </div>

      {lightbox && (
        <div 
        onClick={() => setLightbox(null)}
        style= {{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, cursor: 'pointer', cursor: 'zoom-out', padding: 16
        }}>
            <button onClick={() => setLightbox(null)}
            style={{
                position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.1)', border: 'none', 
                color: '#fff', fontSize: 24, padding: '4px 8px', borderRadius: 4, cursor: 'pointer'
            }}
            >
                <i className="ti ti-x" />
            </button>
            <img src={lightbox} alt="" onClick={e => e.stopPropagation()}
             style={{ 
                maxWidth: '100%', maxHeight: '100%',
                objectFit: 'contain', borderRadius: 8, touchAction: 'pitch-zoom' }} />
        </div>
      )}
      
    </div>
  )
}

function ActionBtn({ icon, onClick, danger }) {
  const [hover, setHover] = useState(false)
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 30, height: 30, borderRadius: 4, border: 'none',
        background: hover ? (danger ? '#FEE2E2' : '#F5F0E8') : 'transparent',
        color: hover ? (danger ? '#991B1B' : '#111') : '#BBB',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
      <i className={`ti ${icon}`} style={{ fontSize: 20 }} aria-hidden="true" />
    </button>
  )
}

function StatBtn({ icon, count, label, active }) {
  const [hover, setHover] = useState(false)
  return (
    <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, cursor: 'pointer', color: hover || active ? '#FF6B2B' : '#BBB' }}>
      <i className={`ti ${icon}`} style={{ fontSize: 16 }} aria-hidden="true" />
      {count ?? label}
    </span>
  )
}