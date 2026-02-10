
import React from 'react';
import { SubmissionStatus, SubmissionState } from '../types';

interface StatusDisplayProps {
  state: SubmissionState;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ state }) => {
  if (state.status === SubmissionStatus.IDLE) return null;

  const getStyle = () => {
    switch (state.status) {
      case SubmissionStatus.SUCCESS: return 'text-green-600';
      case SubmissionStatus.ERROR: return 'text-red-600';
      case SubmissionStatus.RETRYING: return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`mt-4 py-2 text-xs border-t border-b border-gray-100 italic ${getStyle()}`}>
      {state.status === SubmissionStatus.PENDING && 'Status: Pending...'}
      {state.status === SubmissionStatus.RETRYING && `Status: ${state.message}`}
      {state.status === SubmissionStatus.SUCCESS && 'Status: Success.'}
      {state.status === SubmissionStatus.ERROR && `Status: ${state.message}`}
    </div>
  );
};
