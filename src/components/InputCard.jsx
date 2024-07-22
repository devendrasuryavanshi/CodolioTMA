import React, { useState } from 'react';
import { Plus, ShoppingBag } from 'lucide-react';

const InputCard = ({ addTransaction, setShowInputCard }) => {
    const [type, setType] = useState('Income');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [currency, setCurrency] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && amount && category && dateTime && currency) {
            addTransaction({ title, amount: parseFloat(amount), category, currency, dateTime, type, note });
            setTitle('');
            setAmount('');
            setCategory('');
            setCurrency('');
            setDateTime('');
            setNote('');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg w-96 overflow-hidden">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-4">
                        <div type="button" onClick={() => setType('Income')} className={`cursor-pointer px-4 py-2 w-full rounded-none ${type === 'Income' ? 'dark:bg-green-500 bg-green-400 text-white' : 'bg-gray-600'}`}>
                            Income
                        </div>
                        <div type="button" onClick={() => setType('Expense')} className={`cursor-pointer px-4 py-2 w-full rounded-none ${type === 'Expense' ? 'bg-red-500 text-white' : 'bg-gray-600'}`}>
                            Expense
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-2 px-4'>
                        <label className='font-bold text-xl text-black dark:text-white' htmlFor="date-time">Date:</label>
                        <input
                            placeholder='01/01/2024'
                            id="date-time"
                            required
                            type="datetime-local"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            className="w-64 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        />
                    </div>
                    <div className='flex items-center justify-between gap-2 px-4'>
                        <label className='font-bold text-xl text-black dark:text-white' htmlFor="amount">Amount:</label>
                        <input
                            placeholder='2500'
                            id="amount"
                            required
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-64 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        />
                    </div>
                    <div className='flex items-center justify-between gap-2 px-4'>
                        <label className='font-bold text-xl text-black dark:text-white' htmlFor="currencyInput">Currency:</label>
                        <select
                            id="currencyInput"
                            placeholder="INR"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        >
                            <option value="">Currency</option>
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="JPY">JPY</option>
                        </select>
                    </div>
                    <div className='flex items-center justify-between gap-2 px-4'>
                        <label className='font-bold text-xl text-black dark:text-white' htmlFor="categoryInput">Category:</label>
                        <select
                            placeholder="Healthcare"
                            id='categoryInput'
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-64 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
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
                    </div>
                    <div className='flex items-center justify-between gap-2 px-4'>
                        <label className='font-bold text-xl text-black dark:text-white' htmlFor="title">Title:</label>
                        <input
                            placeholder='My First Salary'
                            id="title"
                            required
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-64 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        />
                    </div>
                    <div className='flex flex-col gap-2 px-4'>
                        <label className='font-bold text-xl self-start text-black dark:text-white' htmlFor="notes">Notes:</label>
                        <textarea
                            placeholder='2500'
                            id="notes"
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        />
                    </div>
                    <div className='flex justify-end pb-4 pr-4 gap-4'>
                        <button type="button" onClick={() => setShowInputCard(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InputCard;