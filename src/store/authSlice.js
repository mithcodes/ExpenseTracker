// createSlice: Redux Toolkit ka ek function hai jo ek slice banane ke liye use hota hai. createSlice state, reducers aur actions ko ek saath manage karta hai.

import { createSlice } from "@reduxjs/toolkit";


// initialState ek object hai jo humari authentication-related information ko store karta hai.

// isAuthenticated: false: Initially false rakha gaya hai, iska matlab user logged in nahi hai.
// tokenID: null: Jab tak user login nahi karta, tokenID null rahega. Token ek unique key hoti hai jo server se milti hai jab user login karta hai.
// userID: null: Jab tak user login nahi karega, userID bhi null rahega. userID se user ka unique identity store hota hai.

// tokenID ek unique authentication token hota hai jo har login par naya generate hota hai.
// Yeh token server ko batata hai ki user authenticated hai, aur har request ke saath server ko yeh token bhejna hota hai.
// tokenID hamesha same nahi hota—jab user login ya re-login karta hai, naya token generate hota hai.
// Token ka ek expiration time hota hai (jaise 1 hour). Jab token expire hota hai, ya to user ko dubara login karna padta hai, ya refresh token ka use karke naya tokenID le sakte ho.
// Refresh Token ek long-term token hota hai, jisse user ko baar-baar login karne ki zarurat nahi hoti. Isse naya tokenID generate kiya ja sakta hai jab current token expire ho jaye.

// UserID ka kaam hai user ki identity ko uniquely represent karna.
// Database mein user ke specific data ko retrieve ya update karne ke liye UserID ka use hota hai.


const initialState = {
  isAuthenticated: false,
  tokenID: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.tokenID = action.payload.tokenID;
      state.userID = action.payload.userID;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.tokenID = null;
      state.userID = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
