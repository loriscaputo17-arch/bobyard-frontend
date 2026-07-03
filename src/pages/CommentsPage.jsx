import { useEffect, useState } from 'react'
import { getComments } from '../api/comments'
import CommentFeed from '../components/CommentFeed'

export default function CommentsPage({ role }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getComments()
      .then(setComments)
      .catch(() => setError('Could not load comments. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  const handleAdd    = (c)  => setComments(prev => [c, ...prev])
  const handleUpdate = (c)  => setComments(prev => prev.map(x => x.id === c.id ? c : x))
  const handleDelete = (id) => setComments(prev => prev.filter(x => x.id !== id))

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px' }}>
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: 0 }}>
          Comments
        </h1>
        {!loading && (
          <p style={{ fontSize: 13, color: '#999', marginTop: 4 }}>
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <CommentFeed
        comments={comments}
        loading={loading}
        error={error}
        role={role}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}