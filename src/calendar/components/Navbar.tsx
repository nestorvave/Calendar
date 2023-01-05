import React from "react";

function Navbar() {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        {" "}
        <i className="fa fa-calendar-alt"></i>
        &nbsp; Nestor
      </span>
      <button className="btn btn-outline-danger">
        <i className="fas fa-sing-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  );
}

export default Navbar;
