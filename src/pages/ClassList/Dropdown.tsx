import React, { useState, useEffect, useRef } from "react";
import './Dropdown.css'

interface DropdownProps {
    selected: string;
    setSelected: (option: string) => void;
    options: string[];
  }
const Dropdown: React.FC<DropdownProps> = ({ selected, setSelected, options }) => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Event handler for clicking outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    // Add an event listener to the document when the dropdown is active
    if (isActive) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);
    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>{selected}</div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map((option) => (
                        <div onClick={(e) => {
                            setSelected(option);
                            setIsActive(false);
                        }}
                            className="dropdown-item">
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Dropdown;