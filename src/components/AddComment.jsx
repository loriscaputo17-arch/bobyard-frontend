import { useState } from 'react'
import { addComment } from '../api/comments'

export default function AddComment({ onAdd }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!text.trim()) return
    setLoading(true)
    const newComment = await addComment(text.trim())
    onAdd(newComment)
    setText('')
    setLoading(false)
  }

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
          A
        </div>
        <div style={{ flex: 1 }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleSubmit() }}
            rows={3}
            placeholder="Write a comment…"
            style={{
              width: '100%', border: 'none', outline: 'none', resize: 'none',
              fontSize: 14, color: '#111', fontFamily: 'Inter, sans-serif',
              lineHeight: 1.6, background: 'transparent',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8, borderTop: '1px solid #F5F5F5', paddingTop: 10 }}>
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || loading}
              style={{
                padding: '8px 18px', borderRadius: 8, border: 'none',
                background: text.trim() ? '#111' : '#F0F0F0',
                color: text.trim() ? '#fff' : '#999',
                fontSize: 13, fontWeight: 600, cursor: text.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
              }}
            >
              {loading ? 'Posting…' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}