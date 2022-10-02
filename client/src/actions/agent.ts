import axios, { AxiosError, AxiosResponse } from "axios";
import { Store } from "redux";
import { Basket } from "../models/basket";
import { Category } from "../models/category";
import { Course, RegisterCourse } from "../models/course";
import { PaginatedCourse } from "../models/paginatedCourse";
import { Login, Register, User } from "../models/user";
import { Lecture, LectureDto } from "../models/lecture";
import { notification } from "antd";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const axiosInterceptor = (store: Store) => {
  axios.interceptors.request.use((config) => {
    const token = store.getState().user.user?.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
  });
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status }: AxiosResponse = error.response!;

    switch (status) {
      case 400:
        if (data.errors) {
          const validationErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              validationErrors.push(data.errors[key]);
            }
          }
          throw validationErrors.flat();
        }
        notification.error({
          message: data.errorMessage,
        });
        break;
      case 401:
        notification.error({
          message: data.errorMessage,
        });
        break;
      case 404:
        notification.error({
          message: data.errorMessage,
        });
        break;
      case 500:
        notification.error({
          message: "Server Error, Please try again later",
        });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: <T>(url: string, params?: URLSearchParams) =>
    axios.get<T>(url, { params }).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Users = {
  login: (values: Login) => requests.post<User>("/users/login", values),
  register: (values: Register) =>
    requests.post<User>("/users/register", values),
  addCourse: () => requests.post("/users/purchaseCourses", {}),
  currentUser: () => requests.get<User>("/users/currentUser"),
  addRole: () => requests.post("/users/addRole", {}),
  unpublishedCourses: () => requests.get<Course[]>("/users/unpublishedCourses"),
};

const Courses = {
  list: (params?: URLSearchParams) =>
    requests.get<PaginatedCourse>("/courses", params),
  getById: (id: string) => requests.get<Course>(`/courses/${id}`),
  create: (data: RegisterCourse) => requests.post<string>("/courses", data),
  publish: (courseId: string) =>
    requests.post<string>(`/courses/publish/${courseId}`, {}),
};

const Categories = {
  list: () => requests.get<Category[]>("/categories"),
  getCategory: (id: number) => requests.get<Category>(`/categories/${id}`),
};

const Baskets = {
  get: () => requests.get<Basket>("/basket"),
  addItem: (courseId: string) =>
    requests.post<Basket>(`/basket?courseId=${courseId}`, {}),
  removeItem: (courseId: string) =>
    requests.del(`/basket?courseId=${courseId}`),
  clear: () => requests.del("/basket/clear"),
};

const Payments = {
  paymentIntent: () => requests.post<Basket>("payments", {}),
};

const Lectures = {
  getLectures: (courseId: string) =>
    requests.get<Lecture>(`/lectures/${courseId}`),
  setCurrentLecture: (values: { lectureId: number; courseId: string }) =>
    requests.put(`/lectures/setCurrentLecture`, values),
  create: (data: {
    courseId: string;
    sectionName: string;
    lectures: LectureDto[];
  }) => requests.post<string>("/lectures", data),
};

const agent = {
  Courses,
  Categories,
  Baskets,
  Users,
  Payments,
  Lectures,
};

export default agent;
