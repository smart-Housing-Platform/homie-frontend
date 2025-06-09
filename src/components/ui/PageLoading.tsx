import LoadingSpinner from './LoadingSpinner';

export default function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DCFFEF] to-[#FFE4C9]">
      <div className="text-center">
        <LoadingSpinner size="lg" className="text-[#7B341E]" />
        <p className="mt-4 text-[#7B341E] font-medium">Loading...</p>
      </div>
    </div>
  );
} 