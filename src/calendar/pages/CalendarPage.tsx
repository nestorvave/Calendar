import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../helpers/calendarLocalizer";
import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns/esm";
import { getMessagesEs } from "../../helpers/getMessages";
import CalendarEvent from "../components/CalendarEvent";
import CalendarModal from "./CalendarModal";

const events = [
  {
    title: "Cumple hoy",
    notes: "hay que comprar",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Nestor",
    },
  },
];
function CalendarPage() {
  const [lastView, setLastView] = useState<string | null>(
    localStorage.getItem("lastView") || ""
  );
  const eventStyleGetter = (
    event: any,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event: object) => {
    console.log({ doubleClick: event });
  };
  const onSelect = (event: object) => {
    console.log({ click: event });
  };
  const onViewChanged = (event: string) => {
    localStorage.setItem("lastView", event);
    console.log({ viewChanged: event });
  };
  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView !== null ? lastView : undefined}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "92vh" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  );
}

export default CalendarPage;
