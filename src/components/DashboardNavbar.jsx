import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { HiMenu } from 'react-icons/hi'

const DashboardNavbar = ({ onMenuClick }) => {
  const { logout, session } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    // window.location.href = '/'
    toast.success('Logged out successfully')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <HiMenu className="w-6 h-6" />
        </button>

        <div className="hidden lg:block"></div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
              {session?.user?.username?.charAt(0)?.toUpperCase() || session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-900">
                {session?.user?.username || session?.user?.name || 'User'}
              </div>
              <div className="text-xs text-gray-500">
                {session?.user?.email || 'Welcome back!'}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="bg-slate-600 hover:bg-slate-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNavbar