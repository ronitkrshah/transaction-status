
import React, { useState } from 'react';

interface TransactionFormProps {
  onSubmit: (email: string, amount: number) => void;
  isLoading: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !amount) return;
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;
    onSubmit(email, amountNum);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="email" className="text-xs uppercase font-semibold text-gray-600 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-1.5 border border-black rounded-sm text-sm disabled:opacity-50"
          placeholder="email@example.com"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="amount" className="text-xs uppercase font-semibold text-gray-600 mb-1">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          required
          disabled={isLoading}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-2 py-1.5 border border-black rounded-sm text-sm disabled:opacity-50"
          placeholder="0.00"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-2 text-sm font-bold rounded-sm disabled:bg-gray-400"
      >
        {isLoading ? 'Wait...' : 'Submit'}
      </button>
    </form>
  );
};
