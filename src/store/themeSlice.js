import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setTheme: (state) => {
      state.isDarkTheme = true;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
