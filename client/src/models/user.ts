import { Basket } from "./basket";
import { Course } from "./course";

export interface User {
  email: string;
  token: string;
  basket?: Basket;
  courses?: Course[];
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  password: string;
}
