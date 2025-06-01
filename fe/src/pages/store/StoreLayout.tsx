import { Outlet } from "react-router-dom";
import NavbarStore from "../../components/NavbarStore";
import Footer from "../../components/Footer";

const StoreLayout = () => {
  return (
    <div className="min-h-screen flex flex-col transition-all duration-300">
      <NavbarStore />

      <div className="flex-1 ">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default StoreLayout;
