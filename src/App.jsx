import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login.JSX';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className='container'>
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
     </Router>
    </div>
  )
}

export default App
