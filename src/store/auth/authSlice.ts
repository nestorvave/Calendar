import { createSlice } from "@reduxjs/toolkit";
export interface IAuthState {
  status: string;
  user: {
    name: string | null;
    uid: string | null;
  };
  errorMessage: string | undefined;
}
const initialState: IAuthState = {
  status: "checking",
  user: { name: null, uid: null },
  errorMessage: undefined,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = { name: null, uid: null };
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = { ...payload };
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = { name: null, uid: null };
      state.errorMessage = payload;
    },
    clearErrorMsg: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMsg } =
  authSlice.actions;
