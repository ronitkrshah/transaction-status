
import { ApiResponse, Transaction } from '../types';

/**
 * Simulates an API call with randomized outcomes:
 * 1. Success (200) - Instant
 * 2. Temporary Failure (503) - Instant
 * 3. Delayed Success (200) - 5 to 10 seconds delay
 */
export const mockSubmitTransaction = async (
  email: string, 
  amount: number,
  id: string
): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    const outcome = Math.random();

    // 1. Temporary Failure (503) - ~33% chance
    if (outcome < 0.33) {
      setTimeout(() => {
        resolve({
          status: 503,
          message: 'Service Temporarily Unavailable'
        });
      }, 500);
      return;
    }

    // 2. Delayed Success - ~33% chance
    if (outcome < 0.66) {
      const delay = Math.floor(Math.random() * 5000) + 5000; // 5-10 seconds
      setTimeout(() => {
        resolve({
          status: 200,
          message: 'Transaction processed successfully (delayed)',
          data: { id, email, amount, timestamp: Date.now() }
        });
      }, delay);
      return;
    }

    // 3. Instant Success - ~34% chance
    setTimeout(() => {
      resolve({
        status: 200,
        message: 'Transaction processed successfully',
        data: { id, email, amount, timestamp: Date.now() }
      });
    }, 800);
  });
};
