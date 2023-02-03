import React from "react";
import "./LoginPage.css";
import { useForm } from "../../hooks/useForm";
import useAuthStore from "../../hooks/useAuthStore";
import Swal from "sweetalert2";
const loginFormFields: any = {
  loginEmail: "",
  loginPassword: "",
};
const registerFormFields: any = {
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
  registerName: "",
};
export default function LoginPage() {
  const { startLogin, startRegister } = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    registerEmail,
    registerPassword,
    registerPassword2,
    registerName,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = async (event: any) => {
    event.preventDefault();
    await startLogin({
      email: loginEmail,
      password: loginPassword,
    });
  };

  const registerSubmit = async (event: any) => {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      return Swal.fire(
        "Error en registro",
        "Contraseñas no coinciden",
        "error"
      );
    }
    await startRegister({
      name: registerName,
      password: registerPassword,
      email: registerEmail,
    });
    console.log({
      registerEmail,
      registerPassword,
      registerPassword2,
      registerName,
    });
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail || ""}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword || ""}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName || ""}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail || ""}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword || ""}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2 || ""}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
