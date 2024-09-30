import React from "react";
import Input from "./Input";
import { useSelector } from "react-redux";

const Home = () => {

  const isDarkTheme = useSelector((store) => store.theme.isDarkTheme);

  return (
    <div className="py-10">
      <h1 className={`${isDarkTheme ? "text-xl font-semibold text-center text-white" : "text-xl font-semibold text-center"}`}>
        Welcome To Expense Tracker
      </h1>
      <Input />
    </div>
  );
};

export default Home;
