import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { calendarApi } from "../api/calendarApi";
import { useEffect } from "react";
import {
  clearErrorMsg,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";
import Swal from "sweetalert2";

export default function useAuthStore() {
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticacion", errorMessage, "error");
    }
  }, [errorMessage]);

  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uuid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 10);
    }
  };
  const startRegister = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/register", {
        email,
        password,
        name,
      });
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uuid }));
    } catch (error: any) {
      dispatch(onLogout(error?.response.data?.msg || "Error en el registro"));
      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout(undefined));
    try {
      const { data } = await calendarApi.get("auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uuid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout(undefined));
    }
  };
  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogout(undefined));
  };

  return {
    //Properties
    status,
    user,
    errorMessage,
    //Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  };
}
