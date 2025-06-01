import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type: "submit" | "reset" | "button";
  className?: string;
  icon?: ReactNode;
}

const Button = ({ text, onClick, type, className = "", icon }: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className={`md:w-36 w-full bg-primary hover:bg-secondary text-text   py-2 px-2 rounded cursor-pointer flex items-center justify-center gap-1 ${className}`}
  >
    {icon && <span className="text-2xl">{icon}</span>}
    <span>{text}</span>
  </button>
);

export default Button;
