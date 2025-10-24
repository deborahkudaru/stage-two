import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TT</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Ticket Tocket</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              to="/auth/login" 
              className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;