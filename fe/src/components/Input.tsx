import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, className, type, ...props }) => {
  return (
    <div className="w-full md:w-auto">
      {label && (
        <label className="block mb-1 text-sm font-medium text-text-dark">
          {label}
        </label>
      )}
      <input
        {...props}
        type={type}
        className={`bg-transparent border-0 border-b-2 outline-none 
          transition-colors duration-300 
          text-text-dark
          border-gray-600 focus:border-blue-400
          text-zhi
          placeholder-gray-500
          
          ${className || ""}`}
      />
    </div>
  );
};

export default Input;
