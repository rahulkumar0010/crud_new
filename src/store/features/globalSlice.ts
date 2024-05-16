import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  value: number;
  modalData: any;
  showModal: boolean;
}

const initialState: GlobalState = {
  value: 0,
  modalData: null,
  showModal: false,
};

export const globalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    handleShowModal: (state) => {
      state.showModal = true;
    },
    handleCloseModal: (state) => {
      console.log("CLose Modal")
      state.showModal = false;
    },
    updateModalData: (state, action: PayloadAction<any>) => {
      state.modalData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleShowModal, handleCloseModal, updateModalData } =
  globalSlice.actions;

export default globalSlice.reducer;
