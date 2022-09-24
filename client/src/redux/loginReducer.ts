export interface LoginState {
  visits: number;
}

export const initialState: LoginState = {
  visits: 1,
};

export default function loginReducer(state = initialState, action: any) {
  return state;
}
