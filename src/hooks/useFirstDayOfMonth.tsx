import { useState, useEffect } from 'react'

const useFirstDayOfMonth = (): string => {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<string>('')

  useEffect(() => {
    const currentDate = new Date()
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

    // Format the date as "yyyy-mm-dd"
    const formattedDate = `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1).toString().padStart(2, '0')}-${firstDay
      .getDate()
      .toString()
      .padStart(2, '0')}`

    setFirstDayOfMonth(formattedDate)
  }, [])

  return firstDayOfMonth
}

export default useFirstDayOfMonth
