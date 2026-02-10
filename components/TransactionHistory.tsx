
import React from 'react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  if (transactions.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xs uppercase font-bold text-gray-400 mb-2 tracking-widest">History</h2>
      <div className="text-sm space-y-2">
        {[...transactions].reverse().map((tx) => (
          <div key={tx.id} className="flex justify-between items-start border-b border-gray-50 pb-1">
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{tx.email}</span>
              <span className="text-[10px] text-gray-400">{tx.id.slice(0, 6)}</span>
            </div>
            <span className="font-mono">${tx.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
