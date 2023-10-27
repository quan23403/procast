import { useState } from "react";
import Calendar from "./Calendar";
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form'
import 'react-datepicker/dist/react-datepicker.min.css';
import ScheduleService from "./Schedule.service";
import './Schedule.css';

export default function Schedule() {
  const scheduleService = new ScheduleService();
  const today = new Date(Date.now());
  console.log(today.toDateString());
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 7 * 1000 * 3600 * 24));
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 1000 * 3600 * 24));
  console.log(startDate.toDateString() + endDate.toDateString());
  const classes = scheduleService.getEvents();

  // handle change
  const handleStartChange = (date: Date) => {
    if ((endDate.getTime() - date.getTime()) > 28 * 1000 * 3600 * 24)
      setEndDate(new Date(date.getTime() + 28 * 1000 * 3600 * 24));
    setStartDate(date);
    handleSubmit();
  }

  const handleEndChange = (date: Date) => {
    if ((date.getTime() - startDate.getTime()) > 28 * 1000 * 3600 * 24)
      setStartDate(new Date(date.getTime() - 28 * 1000 * 3600 * 24));
    setEndDate(date);
    handleSubmit();
  }

  const handleSubmit = () => {
    scheduleService.fetchEvents(startDate.toLocaleDateString('vi-VN'), endDate.toLocaleDateString('vi-VN'))
    // classes = scheduleService.getEvents();
  }


  return (
    <>
      <div>
        <div className="date-picker-container">
          <Form className="form-input">
            <Form.Group controlId="startDate">
              <Form.Label className="form-label">Start date:</Form.Label> 
              <DatePicker
                selected={startDate}
                onChange={handleStartChange}
                className="form-control" // Use the Bootstrap form-control class
                placeholderText="Select Start Date"
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End date:</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={handleEndChange}
                className="form-control" // Use the Bootstrap form-control class
                placeholderText="Select End Date"
              />
            </Form.Group>
          </Form>
        </div>


        <Calendar startDate={startDate} endDate={endDate} events={classes} />
      </div >
    </>
  )
}
