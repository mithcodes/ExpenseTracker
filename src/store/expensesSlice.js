import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { addData } = expenseSlice.actions;

export default expenseSlice.reducer;
