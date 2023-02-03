import React from "react";
import useAuthStore from "../../hooks/useAuthStore";

function Navbar() {
  const { startLogout, user } = useAuthStore();
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        {" "}
        <i className="fa fa-calendar-alt"></i>
        &nbsp;
        {user.name}
      </span>
      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sing-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  );
}

export default Navbar;
