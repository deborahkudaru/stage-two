import { NavLink } from 'react-router-dom'
import { MdDashboard, MdConfirmationNumber } from 'react-icons/md'

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white shadow-sm border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Ticket Tocket</h2>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="px-3">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/dashboard"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'bg-slate-600 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <MdDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tickets"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'bg-slate-600 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <MdConfirmationNumber className="w-5 h-5 mr-3" />
                Tickets
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}