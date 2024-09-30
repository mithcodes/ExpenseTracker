import React from "react";

const Download = (props) => {
  const data = props.data;

  const downloadExpenses = () => {
    const csvContent = "data:text/csv;charset=utf-8," + formatExpensesToCSV();
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  const formatExpensesToCSV = () => {
    let csv = "Description,Category,Price\n";
    data.forEach((expense) => {
      csv += `${expense.description},${expense.category},${expense.price}\n`;
    });
    return csv;
  };

  return (
    <div>
      <button
        className="bg-green-500 flex mx-auto text-white shadow-md rounded-md m-2 p-2 font-semibold hover:bg-green-600"
        onClick={downloadExpenses}
      >
        Download Expenses
      </button>
    </div>
  );
};

export default Download;
