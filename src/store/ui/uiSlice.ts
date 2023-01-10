import { createSlice } from "@reduxjs/toolkit";
export interface IUiInitialState {
  isDateModalOpen: boolean;
}
 const initialState: IUiInitialState = {
  isDateModalOpen: false,
};
export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
