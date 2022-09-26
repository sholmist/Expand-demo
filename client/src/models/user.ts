import { Basket } from "./basket";

export interface User {
  email: string;
  token: string;
  basket?: Basket;
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
