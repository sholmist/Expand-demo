import { Course } from "./course";


export interface PaginatedCourse {
    pageIndex: number;
    count: number;
    pageSize: number;
    data: Course[];
}

