import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function DashboardNavbar() {
  const { logout, session } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    window.location.href = '/' // redirects to landing page
  }

  return (
    <nav className="flex items-center justify-between bg-white shadow px-6 py-3">
      <h1 className="text-xl font-semibold text-gray-800">Ticket Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{session?.user?.username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
