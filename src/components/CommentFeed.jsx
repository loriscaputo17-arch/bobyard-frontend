import AddComment from './AddComment'
import CommentCard from './CommentCard'

export default function CommentFeed({ comments, loading, error, role, onAdd, onUpdate, onDelete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {role === 'admin' && <AddComment onAdd={onAdd} />}

      {loading && (
        <p style={{ fontSize: 13, color: '#999', textAlign: 'center', padding: '40px 0' }}>Loading…</p>
      )}

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#991B1B' }}>
          {error}
        </div>
      )}

      {!loading && !error && comments.map(comment => (
        <CommentCard
          key={comment.id}
          comment={comment}
          role={role}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}