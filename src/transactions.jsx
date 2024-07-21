import React, { useState, useEffect } from 'react';
import transactionsData from './data/transactions';
import Card from './Card';
import { Plus } from 'lucide-react';
import InputCard from './InputCard';
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currencyFilter, setCurrencyFilter] = useState('');
    const [showInputCard, setShowInputCard] = useState(false);
    const [newTransactionData, setNewTransactionData] = useState(transactionsData);

    useEffect(() => {
        let filteredTransactions = newTransactionData;

        if (searchTerm) {
            filteredTransactions = filteredTransactions.filter(transaction =>
                transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (typeFilter) {
            filteredTransactions = filteredTransactions.filter(transaction =>
                transaction.type === typeFilter
            );
        }

        if (categoryFilter) {
            filteredTransactions = filteredTransactions.filter(transaction =>
                transaction.category === categoryFilter
            );
        }

        if (currencyFilter) {
            filteredTransactions = filteredTransactions.filter(transaction =>
                transaction.currency === currencyFilter
            );
        }

        filteredTransactions.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

        const groupedTransactions = {};
        filteredTransactions.forEach(transaction => {
            const date = new Date(transaction.dateTime).toLocaleDateString();
            if (!groupedTransactions[date]) {
                groupedTransactions[date] = {
                    transactions: [],
                    totalIncome: 0,
                    totalExpense: 0
                };
            }
            groupedTransactions[date].transactions.push(transaction);
            if (transaction.type == 'Income') {
                groupedTransactions[date].totalIncome += transaction.amount;
            } else {
                groupedTransactions[date].totalExpense += transaction.amount;
            }
        });

        const result = Object.keys(groupedTransactions).map(date => ({
            date,
            transactions: groupedTransactions[date].transactions,
            totalIncome: groupedTransactions[date].totalIncome,
            totalExpense: groupedTransactions[date].totalExpense
        }));

        setTransactions(result);
    }, [newTransactionData, searchTerm, typeFilter, categoryFilter, currencyFilter]);

    const addTransaction = (transaction) => {
        setNewTransactionData(prevData => [...prevData, transaction]);
        setShowInputCard(false);
    };    
    

    return (
        <div>
            <div className='flex flex-col md:flex-row w-full h-full gap-4'>
                <input
                    type="search"
                    id="search"
                    className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 ${searchTerm !== "" ? "bg-green-500 dark:bg-green-900 text-white" : ""}`}
                    placeholder="Search by Title"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex gap-4">
                    <select
                        id="type"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${typeFilter !== "" ? "bg-green-500 dark:bg-green-900 text-white" : ""}`}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">Type</option>
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                    </select>

                    <select
                        id="category"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${categoryFilter !== "" ? "bg-green-500 dark:bg-green-900 text-white" : ""}`}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Category</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Travel">Travel</option>
                        <option value="Investment">Investment</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Salary">Salary</option>
                        <option value="Freelance">Freelance</option>
                    </select>

                    <select
                        id="currency"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${currencyFilter !== "" ? "bg-green-500 dark:bg-green-900 text-white" : ""}`}
                        onChange={(e) => setCurrencyFilter(e.target.value)}
                    >
                        <option value="">Currency</option>
                        <option value="INR">INR</option>
                        <option value="EUR">EUR</option>
                        <option value="JPY">JPY</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
            </div>
            <div className='mt-4'>
                <Card transactions={transactions} setTransactions={setTransactions} />
            </div>
            <Plus onClick={() => { setShowInputCard(true) }} className='fixed bottom-10 right-4 text-white bg-pink-600 rounded-full cursor-pointer' strokeWidth='2' size={40} />
            {showInputCard && <InputCard addTransaction={addTransaction} setShowInputCard={setShowInputCard}/>}
        </div>
    );
};

export default Transactions;