import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTicketAlt, FaTable, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify/unstyled";

type SidebarProps = {
  onLinkClick?: () => void;
};

const Sidebar = ({ onLinkClick }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      toast.success("Logout Berhasil");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const links = [
    { to: "/dashboard/", label: "Home", icon: <FaHome />, exact: true },
    { to: "/dashboard/voucher", label: "Voucher", icon: <FaTicketAlt /> },
    { to: "/dashboard/transaction", label: "Transaction", icon: <FaTable /> },
  ];

  return (
    <aside className="md:w-64 h-full pt-12 md:pt-0 bg-primary-dark text-text-dark flex flex-col ">
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-accent-dark transition-colors ${
                isActive ? "bg-secondary-dark font-bold" : ""
              }`
            }
            onClick={onLinkClick} // Tutup sidebar saat link diklik
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="p-2">
        <button
          onClick={async () => {
            await handleLogout();
            if (onLinkClick) onLinkClick();
          }}
          className="cursor-pointer flex items-center gap-2 w-full p-2 rounded hover:bg-red-600 text-white bg-red-500 transition-colors"
        >
          Logout <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
