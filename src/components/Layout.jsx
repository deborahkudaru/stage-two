import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      <Navbar />
      <main className="container py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
