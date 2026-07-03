import { useState } from 'react'
import Topbar from './components/TopBar'
import CommentsPage from './pages/CommentsPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  const [page, setPage] = useState('comments')
  const [role, setRole] = useState('admin')

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'Inter, sans-serif' }}>
      <Topbar
        activePage={page}
        onNavigate={setPage}
        role={role}
        setRole={setRole}
      />
      {page === 'dashboard' && <DashboardPage />}
      {page === 'comments'  && <CommentsPage role={role} />}
    </div>
  )
}