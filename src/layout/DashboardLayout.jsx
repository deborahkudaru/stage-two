import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";

const DashboardLayout = () =>{
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50 container">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-6 max-w-[1440px] w-full mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}


export default DashboardLayout;