import { useState } from "react";
import Navbar from "../components/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../helpers/calendarLocalizer";
import { Calendar } from "react-big-calendar";
import { getMessagesEs } from "../../helpers/getMessages";
import CalendarEvent from "../components/CalendarEvent";
import CalendarModal from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import FabAddNew from "../components/FabAddNew";
import FabDelete from "../components/FabDelete";

function CalendarPage() {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, hasEvenetSelected } = useCalendarStore();
  const [lastView, setLastView] = useState<string | null>(
    localStorage.getItem("lastView") || null
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

  const onSelect = (event: object) => {
    setActiveEvent(event);
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
        onDoubleClickEvent={openDateModal}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      {hasEvenetSelected && <FabDelete />}
    </>
  );
}

export default CalendarPage;
