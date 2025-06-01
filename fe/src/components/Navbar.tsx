import { FaBars } from "react-icons/fa";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  return (
    <header className="bg-primary-dark text-text-dark px-4 py-3 shadow flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-xl md:hidden cursor-pointer"
        >
          <FaBars />
        </button>
        <span className="font-bold">Dashboard</span>
      </div>
    </header>
  );
};

export default Navbar;
