import axios, {AxiosResponse} from "axios";
import { Category } from "../models/category";
import { Course } from "../models/course";
import { PaginatedCourse } from "../models/paginatedCourse";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody =  <T> (response: AxiosResponse<T>) => response.data;

axios.defaults.withCredentials = true;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Courses = {
    list: () => requests.get<PaginatedCourse>("/courses"),
    getById: (id: string) => requests.get<Course>(`/courses/${id}`),
};

const Categories = {
    list: () => requests.get<Category[]>("/categories"),
    getCategory: (id: number) => requests.get<Category>(`/categories/${id}`)
};

const Basket = {
    get: () => requests.get("/basket"),
    addItem: (courseId: string) => requests.post(`/basket?courseId=${courseId}`, {}),
    removeItem: (courseId: string) => requests.del(`/basket?courseId=${courseId}`)
};

const agent = {
    Courses,
    Categories,
    Basket,
};

export default agent;