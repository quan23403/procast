export interface ScheduleParam{
    fromDate?: string | undefined;
    toDate?: string | undefined;
    courseId?: string | undefined;
}

export interface CourseClass{
    course_id: number;
    course_name: string;
    course_code: string;
    start_time: string;
    end_time: string;
    date: string;
}