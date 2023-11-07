import { useState, useEffect } from 'react'

const useCurrentMonthYear = () => {
  const [currentMonth, setCurrentMonth] = useState<string>('')
  const [currentYear, setCurrentYear] = useState<string>('')

  useEffect(() => {
    const currentDate = new Date()
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()
    setCurrentMonth(month.toString())
    setCurrentYear(year.toString())
  }, [])

  return { currentMonth, currentYear }
}

export default useCurrentMonthYear
