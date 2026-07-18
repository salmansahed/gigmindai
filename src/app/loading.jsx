export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1d]/60 backdrop-blur-md">
      {/* Container for the loading animation */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Glowing Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#0a0f1d] rounded-full" />
          <div className="absolute inset-0 border-t-4 border-[#00e599] rounded-full animate-spin shadow-[0_0_15px_rgba(0,229,153,0.5)]" />
        </div>

        {/* Loading Text */}
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00e599]/80 animate-pulse">
          Initializing Engine...
        </p>
      </div>
    </div>
  );
}
