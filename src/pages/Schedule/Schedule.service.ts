import CourseClass from "./CourseClass";

export default class ScheduleService {
    baseUrl = 'https://localhost:8080/class';
    events: CourseClass[] = [];

    getEvents(): CourseClass[] { return this.events};
    setEvents(events: CourseClass[]) { this.events = events};

    async fetchEvents(startDate: string, endDate: string) {
        try {
            const response = await fetch(`${this.baseUrl}/schedule`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    startDate: startDate,
                    endDate: endDate
                })
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