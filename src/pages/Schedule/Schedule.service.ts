import CourseClass from "./CourseClass";

export default class ScheduleService {
    baseUrl = '';
    events: CourseClass[] = [];

    getEvents(): CourseClass[] { return this.events};
    setEvents(events: CourseClass[]) { this.events = events};
}