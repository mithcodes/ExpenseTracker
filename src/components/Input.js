import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../store/expensesSlice";
import Download from "./Download";
import { setTheme } from "../store/themeSlice";

const Input = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editType, setEditType] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((store) => store.expenses.expenses);
  const [totalPrice, setTotalPrice] = useState(null);
  const isDarkTheme = useSelector((store) => store.theme.isDarkTheme);
  const userID = useSelector((store) => store.auth.userID);

  const amount = useRef(null);
  const desc = useRef(null);
  const type = useRef(null);

  const fetchData = async () => {
    try {
      const dummyEmail = userID
        .toLowerCase()
        .split("")
        .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
        .join("");
      const response = await fetch(
        `https://expensetrackerwithcrud-default-rtdb.firebaseio.com/${dummyEmail}/expenses.json`
      );
      const data = await response.json();
      const loadedExpenses = [];

      for (const key in data) {
        loadedExpenses.push({
          key: key,
          price: data[key].price,
          description: data[key].description,
          category: data[key].category,
        });
      }
      dispatch(addData(loadedExpenses));
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchData();

    if (data !== null) {
      const totalAmt = data.reduce(
        (acc, curr) => acc + parseInt(curr.price),
        0
      );
      setTotalPrice(totalAmt);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      price: amount.current.value,
      description: desc.current.value,
      category: type.current.value,
    };

    const dummyEmail = userID
      .toLowerCase()
      .split("")
      .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
      .join("");

    try {
      let url = `https://expensetrackerwithcrud-default-rtdb.firebaseio.com/${dummyEmail}/expenses.json`;
      let method = "POST";

      if (editingExpense) {
        url = `https://expensetrackerwithcrud-default-rtdb.firebaseio.com/${dummyEmail}/expenses/${editingExpense.key}.json`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(newExpense),
        headers: {
          "Content-type": "application/json",
        },
      });

      fetchData();
      if (!response.ok) {
        throw new Error("Failed to save data to Firebase");
      }

      amount.current.value = "";
      desc.current.value = "";
      type.current.value = "";
      setEditingExpense(null);
      setEditAmount("");
      setEditDesc("");
      setEditType("");
    } catch (error) {
      console.error("Error saving data to Firebase:", error.message);
    }
  };

  const deleteItem = async (key) => {
    try {
      const dummyEmail = userID
        .toLowerCase()
        .split("")
        .filter((x) => x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122)
        .join("");
      await fetch(
        `https://expensetrackerwithcrud-default-rtdb.firebaseio.com/${dummyEmail}/expenses/${key}.json`,
        {
          method: "DELETE",
        }
      );
      fetchData();
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);

    setEditAmount(expense.price);
    setEditDesc(expense.description);
    setEditType(expense.category);
  };

  const handleToggleTheme = () => {
    dispatch(setTheme());
  };

  return (
    <div>
      <form
        className="w-[60%] md:w-[50%] flex flex-col md:flex-row justify-center mx-auto my-10"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 m-2 border border-gray-400"
          placeholder="Amount spent"
          type="number"
          required
          ref={amount}
          value={editAmount}
          onChange={(e) => setEditAmount(e.target.value)}
        />
        <input
          className="p-2 m-2 border border-gray-400"
          placeholder="Description"
          type="text"
          required
          ref={desc}
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />
        <select
          ref={type}
          className="p-2 m-2 border border-gray-400"
          value={editType}
          onChange={(e) => setEditType(e.target.value)}
        >
          <option>Food</option>
          <option>Fuel</option>
          <option>Shopping</option>
          <option>Grocery</option>
        </select>
        <button className="bg-blue-500 text-white shadow-md rounded-md m-2 p-2 font-semibold hover:bg-blue-600">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
      <p
        className={`${
          isDarkTheme
            ? "text-center text-lg font-semibold text-white"
            : "font-semibold text-center text-lg"
        }`}
      >
        Total Amount Spent : ₹{totalPrice}
      </p>
      {totalPrice > 10000 && (
        <div>
          <button
            className="flex m-4 mx-auto bg-blue-500 text-white shadow-md rounded-md p-2 font-semibold hover:bg-blue-600"
            onClick={handleToggleTheme}
          >
            ✨Activate Premium✨
          </button>
        </div>
      )}
      <Download data={data} />
      {isLoading ? (
        <div
          className={`${
            isDarkTheme
              ? "text-white text-3xl mt-10 text-center font-semibold"
              : "text-gray-800 text-3xl mt-10 text-center font-semibold"
          }`}
        >
          Loading...
        </div>
      ) : (
        <div className="w-[80%] md:w-[50%] mx-auto flex flex-col md:flex-row flex-wrap m-5">
          {data.map((item) => (
            <div
              className="w-[80%] md:w-[30%] m-5 h-[40%] flex flex-col text-center mx-auto rounded-lg bg-white p-5 list-none border border-gray-400 text-xl font-semibold"
              key={item.key}
            >
              <div className="m-2 text-blue-500 text-3xl p-2">
                {item.description}
              </div>
              <div className="m-2 p-2">{item.category}</div>
              <div className="m-2 p-2">₹{item.price}</div>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white shadow-md rounded-md p-2 font-semibold hover:bg-blue-600"
                  onClick={() => editExpense(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white shadow-md rounded-md p-2 font-semibold hover:bg-red-600"
                  onClick={() => deleteItem(item.key)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
