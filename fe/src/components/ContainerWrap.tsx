interface BoxWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerWrap = ({ children, className }: BoxWrapperProps) => {
  return (
    <div className={`max-w-[1200px] mx-auto p-4 space-y-6  ${className}`}>
      {children}
    </div>
  );
};

export default ContainerWrap;
