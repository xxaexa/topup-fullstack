interface BoxWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className }: BoxWrapperProps) => {
  return (
    <div
      className={`text-text-dark bg-gray-800 shadow rounded-xl p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
