import React, { useState, useEffect, useRef } from 'react'
import './NavbarComponent.css'
import { NavLink } from 'react-router-dom'
interface DropdownProps {
  selected: string
  options: string[]
  aliasPath: string[]
}
const NavbarComponent: React.FC<DropdownProps> = ({ selected, options, aliasPath }) => {
  const [isActive, setIsActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  // const optionSize = _.size(options)

  // Event handler for clicking outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsActive(false)
    }
  }

  useEffect(() => {
    // Add an event listener to the document when the dropdown is active
    if (isActive) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isActive])
  return (
    <div className='dropdown' ref={dropdownRef}>
      <div className='dropdown-btn' onClick={() => setIsActive(!isActive)}>
        {selected}
      </div>
      {isActive && (
        <div className='dropdown-content'>
          {options.map((option, index) => (
            <div onClick={() => setIsActive(false)} className='dropdown-item'>
              <div>
                <NavLink to={aliasPath[index]} key={index}>
                  {({ isActive }) => <span className={isActive ? 'bg-black' : ''}>{option}</span>}
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default NavbarComponent
