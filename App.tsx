import React, { useState, useCallback, useRef } from "react";
import { Transaction, SubmissionStatus, SubmissionState } from "./types";
import { mockSubmitTransaction } from "./services/mockApi";
import { TransactionForm } from "./components/TransactionForm";
import { StatusDisplay } from "./components/StatusDisplay";
import { TransactionHistory } from "./components/TransactionHistory";

const MAX_RETRIES = 3;

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [state, setState] = useState<SubmissionState>({
    status: SubmissionStatus.IDLE,
    retryCount: 0,
    message: "",
  });

  const processedIdsRef = useRef<Set<string>>(new Set());

  const handleTransactionSubmission = useCallback(
    async (email: string, amount: number) => {
      const transactionId = Math.random()
        .toString(36)
        .substring(7)
        .toUpperCase();

      setState({
        status: SubmissionStatus.PENDING,
        retryCount: 0,
        message: "Processing...",
      });

      const executeSubmission = async (attempt: number): Promise<void> => {
        try {
          const response = await mockSubmitTransaction(
            email,
            amount,
            transactionId,
          );

          if (response.status === 200) {
            if (!processedIdsRef.current.has(transactionId)) {
              processedIdsRef.current.add(transactionId);
              if (response.data) {
                setTransactions((prev) => [...prev, response.data!]);
              }
            }

            setState({
              status: SubmissionStatus.SUCCESS,
              retryCount: attempt,
              message: response.message,
            });

            setTimeout(() => {
              setState((prev) =>
                prev.status === SubmissionStatus.SUCCESS
                  ? { ...prev, status: SubmissionStatus.IDLE }
                  : prev,
              );
            }, 2000);
          } else if (response.status === 503) {
            if (attempt < MAX_RETRIES) {
              setState({
                status: SubmissionStatus.RETRYING,
                retryCount: attempt + 1,
                message: `Retrying (${attempt + 1}/${MAX_RETRIES})...`,
              });

              const waitTime = 1000;
              setTimeout(() => {
                executeSubmission(attempt + 1);
              }, waitTime);
            } else {
              setState({
                status: SubmissionStatus.ERROR,
                retryCount: attempt,
                message: "Service unavailable. Please try again.",
              });
            }
          } else {
            setState({
              status: SubmissionStatus.ERROR,
              retryCount: attempt,
              message: response.message || "Error occurred.",
            });
          }
        } catch (err) {
          setState({
            status: SubmissionStatus.ERROR,
            retryCount: attempt,
            message: "Network error.",
          });
        }
      };

      executeSubmission(0);
    },
    [],
  );

  const isLoading =
    state.status === SubmissionStatus.PENDING ||
    state.status === SubmissionStatus.RETRYING;

  return (
    <div className="max-w-sm mx-auto p-6">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-lg font-bold">Transaction Status</h1>
      </header>

      <main>
        <TransactionForm
          onSubmit={handleTransactionSubmission}
          isLoading={isLoading}
        />

        <StatusDisplay state={state} />

        <TransactionHistory transactions={transactions} />
      </main>
    </div>
  );
};

export default App;
