import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const Card = ({ transactions, setTransactions }) => {
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const getFormattedDate = (dateString) => {
        const parts = dateString.split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        const date = new Date(year, month, day);

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = daysOfWeek[date.getDay()];

        return `${day} ${dayOfWeek}`;
    };

    const handleDeleteClick = (groupIndex, transactionIndex) => {
        setDeleteIndex({ groupIndex, transactionIndex });
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        const updatedTransactions = transactions.map((group, groupIndex) => {
            if (groupIndex === deleteIndex.groupIndex) {
                const updatedGroupTransactions = group.transactions.filter(
                    (_, index) => index !== deleteIndex.transactionIndex
                );

                if (updatedGroupTransactions.length === 0) {
                    return null;
                }

                return { ...group, transactions: updatedGroupTransactions };
            }
            return group;
        }).filter(group => group !== null);

        setTransactions(updatedTransactions);
        setShowConfirm(false);
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                {transactions.map((group, groupIndex) => (
                    <div
                        className="bg-white dark:bg-slate-900 rounded-lg px-4 py-2"
                        key={groupIndex}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                                {getFormattedDate(group.date)}
                            </h3>
                            <div className="flex gap-4">
                                <span className="font-bold text-xl text-green-600 dark:text-green-600">
                                    {group.totalIncome}
                                </span>
                                <span className="font-bold text-xl text-red-600 dark:text-pink-600">
                                    {group.totalExpense}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {group.transactions.map((transaction, transactionIndex) => (
                                <div
                                    key={transactionIndex}
                                    className="flex justify-between items-center bg-slate-100 dark:bg-slate-950 p-2 rounded-lg"
                                >
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <span className="font-bold text-sm bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg px-2 py-2">
                                            {transaction.category}
                                        </span>
                                        <h1 className="font-bold text-lg text-gray-800 dark:text-white">
                                            {transaction.title}
                                        </h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <span
                                            className={`font-bold text-lg ${transaction.type === "Income"
                                                ? "text-green-600"
                                                : "text-pink-500"
                                                }`}
                                        >
                                            {transaction.amount}
                                        </span>
                                        <button
                                            onClick={() => handleDeleteClick(groupIndex, transactionIndex)}
                                        >
                                            <Trash2 className="text-red-700 dark:text-white" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                        <h2 className="text-lg dark:text-white text-black font-bold mb-4">
                            Do you want to delete this transaction?
                        </h2>
                        <div className="flex gap-4 justify-evenly">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded-lg w-full"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-pink-700 text-white px-4 py-2 rounded-lg w-full"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;