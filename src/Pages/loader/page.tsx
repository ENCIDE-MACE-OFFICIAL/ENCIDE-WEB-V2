import React from 'react'

export default function Loader() {
  return (
    <div style={{zIndex:'9999'}} className="fixed z-50 top-0 left-0 w-dvw h-dvh bg-neutral-950 flex flex-col justify-center items-center">
      {/* Outer spinning rings */}
      <div className="relative flex justify-center items-center w-20 h-20">
        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-red-600 animate-[spin_1.5s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-red-500 animate-[spin_2s_linear_infinite_reverse]" />
        
        {/* Inner static logo letter */}
        <div className="flex items-center justify-center font-display font-bold text-2xl text-white">
          E
        </div>
      </div>
      
      {/* Loading text */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <h1 className="text-white font-display font-medium tracking-[0.25em] text-xs uppercase animate-pulse">
          Initializing
        </h1>
        <div className="flex gap-1.5">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-1 h-1 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-1 h-1 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}