import { useState, useEffect } from 'react'

const useLastDayOfMonth = (): string => {
  const [lastDayOfMonth, setLastDayOfMonth] = useState<string>('')

  useEffect(() => {
    const currentDate = new Date()
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    // Format the date as "yyyy-mm-dd"
    const formattedDate = `${lastDay.getFullYear()}-${(lastDay.getMonth() + 1).toString().padStart(2, '0')}-${lastDay
      .getDate()
      .toString()
      .padStart(2, '0')}`

    setLastDayOfMonth(formattedDate)
  }, [])

  return lastDayOfMonth
}

export default useLastDayOfMonth
