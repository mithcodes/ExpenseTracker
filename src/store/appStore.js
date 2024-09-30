import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expensesReducer from "./expensesSlice";
import themeReducer from "./themeSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer,
  },
});

export default appStore;


// configureStore function:

// Yeh Redux Toolkit ka ek built-in function hai jo ek Redux store banata hai.
// Redux store ek centralized jagah hoti hai jaha aapki poori application ka state manage hota hai.
// reducer:

// Yeh ek object hai jo different "reducers" ko hold karta hai.
// "Reducer" ek function hota hai jo state ko change karta hai, based on action (jaise login, logout, etc.).
// auth: authReducer:

// Ye line batata hai ki "auth" state ka part authReducer handle karega.
// authReducer aapke login/logout state ko handle karta hai, jaisa ki aapne pehle authSlice mein banaya tha.
// expenses: expensesReducer:

// Is line ka matlab hai ki "expenses" state ka part expensesReducer manage karega.
// Expenses ko add ya update karne ke liye yeh reducer use hoga.
// theme: themeReducer:

// Iska matlab hai ki theme-related state ko themeReducer handle karega.
// Yeh dark/light mode ko toggle karne ka kaam karega.
// Overall:
