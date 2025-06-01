import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Navbar } from "../../components";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-background-dark text-text  flex flex-col">
      {/* Navbar at the top */}
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 h-[calc(100vh-56px)] overflow-hidden">
        {/* Sidebar Desktop */}
        <div className="hidden md:block w-64 bg-gray-100 dark:bg-gray-800">
          <Sidebar />
        </div>

        {/* Sidebar Mobile */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 md:hidden transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-gray-100 dark:bg-gray-800`}
        >
          <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
