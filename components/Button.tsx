"use client";

import { ReactNode } from "react";
import { ImSpinner2 } from "react-icons/im";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary";
  type?: "submit" | "button" | "reset";
  loading?: boolean;
}
const Button = ({
  text,
  type,
  icon,
  onClick,
  variant,
  loading,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-2 justify-center px-4 py-3 rounded-full  text-white whitespace-nowrap 
        ${
          variant == "primary"
            ? "bg-primary drop-shadow-primary"
            : "bg-secondary border border-secondary"
        }`}
    >
      {loading && <ImSpinner2 size={20} className="animate-spin" />}
      <span>{text}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
