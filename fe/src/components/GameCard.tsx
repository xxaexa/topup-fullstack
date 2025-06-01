import React from "react";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  image: string;
  name: string;
  link: string;
}

const GameCard: React.FC<GameCardProps> = ({ image, name, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg transition duration-300"
    >
      <div className="w-[30%]">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="w-[70%] flex items-center justify-center p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default GameCard;
