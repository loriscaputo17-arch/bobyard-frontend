import { useState, useRef } from 'react'
import { addComment } from '../api/comments'
import { uploadImage } from '../lib/uploadImage'

export default function AddComment({ onAdd }) {
  const [text, setText] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [posting, setPosting] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      setImageUrl(url)
    } catch (err) {
      alert('Image upload failed. Try again.')
      console.error(err)
    } finally {
      setUploading(false)
      e.target.value = '' // reset così puoi ricaricare lo stesso file
    }
  }

  const handleSubmit = async () => {
    if (!text.trim() && !imageUrl) return
    setPosting(true)
    const newComment = await addComment(text.trim(), imageUrl ? [imageUrl] : [])
    onAdd(newComment)
    setText('')
    setImageUrl(null)
    setPosting(false)
  }

  const canPost = (text.trim() || imageUrl) && !posting && !uploading

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
            style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', fontSize: 14, color: '#111', fontFamily: 'Inter, sans-serif', lineHeight: 1.6, background: 'transparent' }}
          />

          {/* Preview immagine caricata */}
          {imageUrl && (
            <div style={{ position: 'relative', display: 'inline-block', marginTop: 8 }}>
              <img src={imageUrl} alt="" style={{ maxHeight: 120, borderRadius: 10, display: 'block' }} />
              <button
                onClick={() => setImageUrl(null)}
                style={{ position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <i className="ti ti-x" style={{ fontSize: 14 }} />
              </button>
            </div>
          )}

          {/* Spinner durante upload */}
          {uploading && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#999', display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className="ti ti-loader-2" style={{ fontSize: 14, animation: 'spin 1s linear infinite' }} />
              Uploading image…
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderTop: '1px solid #F5F5F5', paddingTop: 10 }}>
            {/* Bottone upload immagine */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: '1px solid #F0F0F0', background: '#fff', fontSize: 13, color: '#666', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
            >
              <i className="ti ti-photo" style={{ fontSize: 16 }} />
              Photo
            </button>

            {/* Input file nascosto — capture apre la fotocamera su mobile */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <button
              onClick={handleSubmit}
              disabled={!canPost}
              style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: canPost ? '#111' : '#F0F0F0', color: canPost ? '#fff' : '#999', fontSize: 13, fontWeight: 600, cursor: canPost ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif' }}
            >
              {posting ? 'Posting…' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}