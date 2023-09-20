import React from 'react';
import CourseClass from './CourseClass';

export default function Calendar(props: { startDate: string | number | Date; endDate: string | number | Date; events: CourseClass[]; }) {
  // get start and end date
  const startDate = new Date(props.startDate);
  const endDate = new Date(props.endDate);
  console.log(`${startDate.toDateString()} và ${endDate.toDateString()}`);
  const isStartMon = startDate.getDay() === 1;
  const isEndSun = endDate.getDay() === 0;
  
  // calendar properties
  const startCalendar: Date = new Date(startDate);
  if (!isStartMon) 
    startCalendar.setDate (startDate.getDate() - (startDate.getDay() === 0? 7 : startDate.getDay()) + 1);
  const endCalendar: Date = new Date(endDate);
  if (!isEndSun)
    endCalendar.setDate(endDate.getDate() + (7 - endDate.getDay()));

  const totalDays = (endCalendar.getTime() - startCalendar.getTime()) / (3600 * 1000 * 24) + 1 ;
  console.log(`${startCalendar.toDateString()} và ${endCalendar.toDateString()} ra ${totalDays}`);

  // events list
  const events: CourseClass[] = props.events;
  const eventCell = (date: Date) => {
    const eventsOnDate = events.filter((classEvent) => {
      const classDate = new Date(classEvent.date);
      return classDate.toDateString() === date.toDateString();
    });

    if (eventsOnDate.length > 0) {
      console.log(eventsOnDate);
      return (
        <div className='classes'>
          {eventsOnDate.map((classEvent) => (
            <button key={classEvent.id} className='classButton'>
              {`${classEvent.startTime}-${classEvent.endTime} ${classEvent.className}`}
            </button>
          ))}
        </div>
      )
    }
  }
  // create calendar
  let weeks = <></>;
  const currentDate = new Date(startCalendar);
  let currentWeek = <tr key={'week_1'}></tr>;

  for (let i = 1; i <= totalDays; i++) {
    const isInRange = currentDate.getTime() >= startDate.getTime()
                    && currentDate.getTime() <= endDate.getTime();

    const dateCell = (
      <td
        key={i}
        className={isInRange? 'in-range' : 'out-of-range'}
      >
        <b className='date'>{currentDate.getDate()}/{currentDate.getMonth()+1}</b>
        {isInRange? eventCell(currentDate): null}
      </td>
    )
    currentWeek = React.cloneElement(currentWeek, null, currentWeek.props.children, dateCell);
    if (i % 7 === 0) {
      weeks = React.cloneElement(weeks, null, weeks.props.children, currentWeek);
      currentWeek = <tr key={`week_${i/7+1}`}></tr>;
    }

    currentDate.setDate(currentDate.getDate()+1);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>{weeks}</tbody>
    </table>
  )
}
