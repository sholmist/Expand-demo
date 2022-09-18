import axios, {AxiosResponse} from "axios";
import { Course } from "../models/course";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody =  <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Courses = {
    list: () => requests.get<Course[]>("/courses")
};

const agent = {
    Courses
};

export default agent;