import { useState } from 'react'
import ReactDOM from 'react-dom'

export default function TestHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const root = document.getElementById('root') as HTMLElement
  return (
    <div className='dropdown z-200'>
      <button className='dropdown-button relative' onClick={toggleDropdown}>
        Open Dropdown
      </button>
      {isOpen && (
        <ul className='dropdown-list absolute z-500 bg-slate-200'>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
  )
}
