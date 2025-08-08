import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-500/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/20 text-center">
      <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-white/70 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
        >
          Try Again
        </button>
      )}
    </div>
  );
};