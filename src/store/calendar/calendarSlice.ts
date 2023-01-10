import { createSlice } from "@reduxjs/toolkit";

export interface IUiInitialState {
    events: any[];
    activeEvent:null;
}
 const initialState: IUiInitialState = {
  events: [],
  activeEvent:null
};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {
 
  },
});

export const {  } = calendarSlice.actions;
