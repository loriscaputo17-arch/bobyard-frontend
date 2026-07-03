import { useEffect, useState } from 'react'
import { getComments } from './api/comments'
import Sidebar from './components/Sidebar'
import Topbar from './components/TopBar'
import DashboardPage from './pages/DashboardPage'
import CommentsPage from './pages/CommentsPage'

export default function App() {
  const [page, setPage] = useState('comments')
  const [role, setRole] = useState('admin')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pageTitles = {
    dashboard: 'Dashboard',
    comments: 'Comments',
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F5F0E8' }}>
      <Sidebar
        role={role}
        setRole={setRole}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={page}
        onNavigate={(p) => { setPage(p); setSidebarOpen(false) }}
      />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Topbar
          title={pageTitles[page]}
          onMenuClick={() => setSidebarOpen(true)}
        />
        {page === 'dashboard' && <DashboardPage />}
        {page === 'comments'  && <CommentsPage role={role} />}
      </div>
    </div>
  )
}