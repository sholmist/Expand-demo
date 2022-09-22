export interface Course {
    id: string;
    title: string;
    price: number;
    instructor: string;
    image: string;
    rating: number;
    description: string;
    category: string;
    language: string;
    level: string;
    students: number;
    subtitle: string;
    learnings: string[] | [];
    requirements: string[] | [];
}