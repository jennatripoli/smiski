"use client";

import { SmiskiCatalog, Summary, SyncBanner } from "@/components";
import { useSmiski } from "@/providers";

export function SmiskiApp() {
  const { smiskis } = useSmiski();

  const totalCount = smiskis.reduce((sum, smiski) => sum + smiski.count, 0);
  const uniqueCount = smiskis.length;

  return (
    <div className="space-y-6">
      <SyncBanner />
      <Summary total={totalCount} unique={uniqueCount} />
      <SmiskiCatalog />
    </div>
  );
}
