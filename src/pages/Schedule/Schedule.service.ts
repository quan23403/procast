import CourseClass from "./CourseClass";
export interface ScheduleParam {
    startDate: string;
    endDate: string;
    course_code?: string;
} 
export default class ScheduleService {
    baseUrl = 'http://localhost:8081/i/v1';
    events: CourseClass[] = [];

    getEvents(): CourseClass[] { return this.events};
    setEvents(events: CourseClass[]) { this.events = events};

    async fetchEvents(startDate: string, endDate: string) {
        try {
            const response = await fetch(`${this.baseUrl}/user-schedule`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}, 
                params: {
                    fromDate: startDate;
                    toDate: endDate;
                }
            });

            if (!response.ok)
                throw new Error(`Resquest failed with error: ${response.status}`);
            
            const data = await response.json();
            this.setEvents(data);
        } catch (error) {
            console.error('Error fetching:', error);
        }
    }
}