export interface englishClass {
  CourseId: number
  CourseName: string
  MainTeacher: string
  Room: number
  StartDate: string
  EndDate: string
  StudyDays: string
  CourseStatus: string
  TotalSessions: number
}
export interface englishCLassList {
  englishClassList: englishClass[]
}
