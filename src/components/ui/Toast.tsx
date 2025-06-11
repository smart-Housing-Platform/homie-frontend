import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#FFFFFF',
          color: '#7B341E',
          border: '2px solid #7B341E',
          borderRadius: '0.75rem',
          padding: '1rem',
          fontSize: '0.875rem',
          maxWidth: '350px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        success: {
          style: {
            background: '#E8F5E9',
            border: '2px solid #266044',
            color: '#266044',
          },
          icon: '✓',
        },
        error: {
          style: {
            background: '#FFF5F5',
            border: '2px solid #7B341E',
            color: '#7B341E',
          },
          icon: '✕',
        },
      }}
    />
  );
} 