import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-slate-700 hover:text-rose-800 transition-colors"
          >
            Logo
          </Link>

          <ul className="flex items-center space-x-8">
            <li>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-slate-700 font-medium transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/auth/login" 
                className="px-6 py-2 bg-slate-700 text-white rounded-full font-medium hover:bg-slate-800 transition-all transform hover:scale-105 shadow-md"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;