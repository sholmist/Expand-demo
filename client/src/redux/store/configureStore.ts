import { createStore } from "redux";
import loginReducer from "../loginReducer";

export function configureStore() {
  return createStore(loginReducer);
}
