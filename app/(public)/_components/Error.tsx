import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();
  return (
    <div
      className="
   h-screen flex flex-col items-center
   space-y-4 justify-center
    "
    >
      <div className="h-screen flex flex-col items-center space-y-4 justify-center">
        <div className="flex flex-col items-center space-y-4 justify-center mt-12">
          <Frown size="80px" />
          <h2 className="text-2xl font-bold text-center text-black font-sans leading-snug">
            This resume is not public.<br/>
            Please make sure the owner has shared it as <span className="font-bold">Public</span>.
          </h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-6 px-8 py-3 rounded-full bg-[#FFD464] text-[#1A237E] font-bold text-base shadow hover:bg-[#ffe28a] transition tracking-widest flex items-center gap-2 uppercase"
          >
            Back to Dashboard
            <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 24 24'><path stroke='#1A237E' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 7l5 5m0 0l-5 5m5-5H3'/></svg>
          </button>
        </div>
        <div className="shrink-0 min-h-14 text-center mt-[500px]">
          <a href="https://hashtalenthub.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://hashtalenthub.com/wp-content/uploads/2025/06/logo_transparent-1.png" alt="logo" style={{height: 90, width: 90, display: 'inline-block', marginBottom: 8}} />
          </a>
          <h5 className="font-semibold text-base mt-2" style={{color: '#111'}}>
            Build by Hash CV
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Error;
