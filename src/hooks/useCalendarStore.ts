import { useDispatch, useSelector } from "react-redux";
import {
  IUiInitialState,
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import { RootState } from "../store/store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(
    (state: RootState) => state.calendar
  );

  const setActiveEvent = (calendarEvent: any) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: any) => {
    if (calendarEvent?._id) {
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent());
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    hasEvenetSelected: !!activeEvent,
  };
};
