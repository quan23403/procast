import {useState } from "react";
import Calendar from "./Calendar";
import DatePicker from 'react-datepicker';
import ScheduleService from "./Schedule.service";
import './Schedule.css'; 

export default function Schedule(){
  const scheduleService = new ScheduleService();
  const today = new Date(Date.now());
  console.log(today.toDateString());
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 7*1000*3600*24));
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7*1000*3600*24));
  console.log(startDate.toDateString()+endDate.toDateString());
  const classes = scheduleService.getEvents();

  // handle change
  const handleStartChange = (date: Date) => {
    if ((endDate.getTime()-date.getTime()) > 28 * 1000 * 3600 * 24) 
      setEndDate(new Date(date.getTime() + 28 * 1000 * 3600 * 24));
    setStartDate(date);
  }

  const handleEndChange =  (date: Date) => {
    if((date.getTime()-startDate.getTime()) >  28 * 1000 * 3600 *24)
      setStartDate(new Date(date.getTime() - 28 * 1000 * 3600 * 24));
    setEndDate(date);
  }

  const handleSubmit =  () => {
    scheduleService.fetchEvents(startDate.toLocaleDateString('vi-VN'), endDate.toLocaleDateString('vi-VN'))
    // classes = scheduleService.getEvents();
  }


  return(
    <>
      <div className="schedule">
        <div>
          <DatePicker
            selected={startDate}
            onChange={handleStartChange}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndChange}
            placeholderText="End Date"
          />
          <button className="btn" type="submit" onClick={handleSubmit}>Search</button>
        </div>
        <Calendar startDate={startDate} endDate={endDate} events={classes} />
      </div>
    </>
  )
}