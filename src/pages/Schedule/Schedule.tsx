import {useState } from "react";
import Calendar from "./Calendar";
import DatePicker from 'react-datepicker';
import ScheduleService from "./Schedule.service";

export default function Schedule(){
  const scheduleService = new ScheduleService();
  const today = new Date(Date.now());
  const [startDate, setStartDate] = useState<Date>(new Date(today.getDate()-7));
  const [endDate, setEndDate] = useState<Date>(new Date(today.getDate()+7));
  const classes = scheduleService.getEvents();
  return(
      <>
      <div className="schedule">
      <div>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            placeholderText="End Date"
          />
          <button>Search</button>
        </div>
          <Calendar startDate={startDate} endDate={endDate} events={classes} />
      </div>
      </>
  )
}