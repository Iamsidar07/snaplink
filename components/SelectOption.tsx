"use client";
import React, { useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";

interface Option {
  value: string;
  label: string;
}

interface AnimatedSelectProps {
  options: Option[];
  onChange: (option: Option) => void;
}

const AnimatedSelect: React.FC<AnimatedSelectProps> = ({
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left bg-secondary border border-secondary rounded-full ">
      <div>
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium"
          onClick={toggleDropdown}
        >
          {selectedOption ? selectedOption.label : "Sort By"}
          <BsChevronCompactDown
            size={25}
            className={`w-4 h-4 ml-2 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-2xl shadow-lg bg-secondary ring-1 ring-secondary ">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="block px-4 py-2 text-sm cursor-pointer hover:translate-x-4 duration-200"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedSelect;
