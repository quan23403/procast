import { Course } from "./CourseDetail";

export class CoureseDetailService {
    baseUrl = "";
    detail!: Course;
    setDetail(detail: Course) {this.detail=detail}
    getDetail(id: number){
        this.fetchCourseDetail(id);
        return this.detail;
    }
    async fetchCourseDetail(id: number) {
        const test: Course = {
            id: id,
            courseType: 'PSA'
        }
        this.setDetail(test);
        // try {
        //     const response = await fetch(`${this.baseUrl}/detail/${id}`, {
        //         method: 'GET',
        //     });
        //     if (!response.ok)
        //         throw new Error(`Resquest failed with error: ${response.status}`);

        //     const data = await response.json();
        //     this.setDetail(data);
        //     return this.detail;
        // } catch (error) {
        //     console.error('Error fetching:', error);
        // }
    }
}