import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
