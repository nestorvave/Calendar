import React from "react";

function CalendarEvent(props: any) {
  const { event } = props;
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      <span>-{user.name}</span>
    </>
  );
}

export default CalendarEvent;
