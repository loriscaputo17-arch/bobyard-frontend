import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
      <Routes>
        <Route path="/" element={<Navigate to="/comments" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/comments"  element={<CommentsPage role={role} />} />
      </Routes>
    </div>
  )
}