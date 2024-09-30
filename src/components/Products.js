import React from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const isDarkTheme = useSelector((store) => store.theme.isDarkTheme);

  return (
    <div className={`${isDarkTheme ? "text-white" : "text-gray-800"}`}>
      <h1 className="font-normal text-3xl md:text-6xl text-center m-10 p-10 md:m-20 md:p-10">
        Currently this service is not available.
      </h1>
    </div>
  );
};

export default Products;
