import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const PieChart = ({ transactions }) => {
    const [transactionsData, setTransactionsData] = useState(transactions);

    let keys = ["Healthcare", "Shopping", "Travel", "Investment", "Entertainment", "Utilities", "Transportation", "Salary", "Freelance"];
    let totalExpense = 0;
    let totalIncome = 0;
    let incomesMap = new Map();
    let expenseMap = new Map();
    for (let key of keys) {
        incomesMap.set(key, 0);
        expenseMap.set(key, 0);
    }

    const incomeData = [
        ["Income", "Annual Income"]
    ];

    const expenseData = [
        ["Expense", "Annual Expense"]
    ];

    for (let transaction of transactionsData) {
        let amount = parseFloat(transaction.amount);
        if (transaction.type === "Income") {
            incomesMap.set(transaction.category, incomesMap.get(transaction.category) + amount);
            totalIncome += amount;
        } else {
            expenseMap.set(transaction.category, expenseMap.get(transaction.category) + amount);
            totalExpense += transaction.amount;
        }
    }

    for (let key of keys) {
        incomeData.push([key, incomesMap.get(key)]);
        expenseData.push([key, expenseMap.get(key)]);
    }

    const options = {
        backgroundColor: "transparent",
        legend: {
            textStyle: {
                color: "gray",
                fontSize: 10,
            },
        },
    }

    return (
        <div className="flex flex-col md:flex-row w-full mb-8">
            <div className="w-full flex flex-col justify-center items-center">
                <Chart
                    chartType="PieChart"
                    data={incomeData}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                />
                <div className="flex flex-row justify-around items-center gap-4 w-auto px-4 py-1 rounded-lg text-center dark:bg-green-900 bg-lime-200 text-green-500">
                    <span className="font-bold text-2xl">Income:</span>
                    <span className="font-bold text-2xl">${totalIncome}</span>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <Chart
                    chartType="PieChart"
                    data={expenseData}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                />
                <div className="flex flex-row justify-around items-center gap-4 w-auto px-4 py-1 text-red-500 rounded-lg dark:bg-red-950 bg-red-200">
                    <span className="font-bold text-2xl">Expense:</span>
                    <span className="font-bold text-2xl">${totalExpense}</span>
                </div>
            </div>
        </div>
    )
}

export default PieChart;