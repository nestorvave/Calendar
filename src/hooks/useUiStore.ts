import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  IUiInitialState,
  onCloseDateModal,
  onOpenDateModal,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector((state: RootState) => state.ui);
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };
  const toggleDateModal = () => {
    isDateModalOpen
      ? dispatch(onCloseDateModal())
      : dispatch(onOpenDateModal());
  };
  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
    toggleDateModal
  };
};
