export interface Basket {
    clientId: string;
    items: CourseItem[];
}

export interface CourseItem {
    courseId: string;
    title: string;
    instructor: string;
    image: string;
    price: number;
}