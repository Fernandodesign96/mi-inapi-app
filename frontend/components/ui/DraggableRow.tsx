"use client";

import { useRef, useState } from "react";
import { clsx } from "clsx";

interface DraggableRowProps {
  children: React.ReactNode;
  className?: string;
}

export default function DraggableRow({ children, className }: DraggableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      // Translate vertical wheel move to horizontal scroll
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      ref={scrollRef}
      onWheel={handleWheel}
      className={clsx(
        "flex overflow-x-auto hide-scrollbar select-none touch-pan-x",
        className
      )}
    >
      {children}
    </div>
  );
}
