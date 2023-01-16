import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

export interface IUiInitialState {
  events: {
    _id?: number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: {
      _id: string;
      name: string;
    };
  }[];
  activeEvent: {
    _id?: number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: {
      _id: string;
      name: string;
    };
  } | null;
}
const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumple hoy",
  notes: "hay que comprar",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Nestor",
  },
};
const initialState: IUiInitialState = {
  events: [tempEvent],
  activeEvent: null,
};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((ev: any) => {
        if (ev._id == payload._id) {
          return payload;
        }
        return ev;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent !== null) {
        if (state.activeEvent._id) {
          state.events = state.events.filter(
            (ev: any) => ev._id !== state.activeEvent?._id
          );
          state.activeEvent = null;
        }
      }
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
