import { FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" transition-transform duration-300 p-4 flex flex-col md:flex-row justify-between items-center text-center text-sm  md:w-[1200px] mx-auto">
      <div className=" w-full mb-2 md:mb-0 text-center">
        © Topup Center 2025
      </div>
      <div className="flex gap-4 justify-center"></div>
    </div>
  );
};

export default Footer;
