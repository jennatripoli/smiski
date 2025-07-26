"use client";

import { Skeleton } from "@/components";

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-md" />
          ))}
      </div>

      {/* Controls skeleton */}
      <div className="flex justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square w-full rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
      </div>
    </div>
  );
}
