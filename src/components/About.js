import React from "react";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const isDarkTheme = useSelector((store) => store.theme.isDarkTheme);

  return (
    <div
      className={`${
        isDarkTheme ? "text-white" : "text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-8 text-center w-3/4 md:w-1/2 space-y-10">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to our expense tracking application! We understand the
          importance of managing your expenses effectively, which is why we've
          created this tool to help you keep track of your spending habits.
        </p>
        <p className="text-lg mb-4">
          Our mission is to provide you with a simple and intuitive platform
          where you can easily record your expenses, categorize them, and
          analyze your spending patterns over time.
        </p>
        <p className="text-lg mb-4">
          Whether you're trying to stick to a budget, save money, or simply gain
          a better understanding of where your money is going, our app is here
          to assist you every step of the way.
        </p>
        <p className="text-lg mb-4">
          Thank you for choosing our expense tracking app. We hope it helps you
          achieve your financial goals!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
