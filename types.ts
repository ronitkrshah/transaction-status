
export interface Transaction {
  id: string;
  email: string;
  amount: number;
  timestamp: number;
}

export enum SubmissionStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  RETRYING = 'RETRYING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ApiResponse {
  status: number;
  message: string;
  data?: Transaction;
}

export interface SubmissionState {
  status: SubmissionStatus;
  retryCount: number;
  message: string;
}
