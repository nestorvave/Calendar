import React from "react";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { addHours } from "date-fns";

function FabDelete() {
  const { startDeletingEvent } = useCalendarStore();
  const handleDelete = () => {
    startDeletingEvent()
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash-alt" />
    </button>
  );
}

export default FabDelete;
