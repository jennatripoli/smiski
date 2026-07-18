"use client";

import { useCallback, useState } from "react";

import { CompletionChart, SmiskiCatalog, SyncBanner } from "@/components";
import { useSmiski } from "@/providers";

function readSessionBool(key: string, defaultValue: boolean) {
  if (typeof window === "undefined") return defaultValue;
  const saved = sessionStorage.getItem(key);
  if (saved === null) return defaultValue;
  return saved === "true";
}

export function SmiskiApp() {
  const { smiskis, loading } = useSmiski();
  const [selectedSeries, setSelectedSeries] = useState("ALL");
  const [includeSecrets, setIncludeSecrets] = useState(() =>
    readSessionBool("includeSecrets", true),
  );
  const [includeDiscontinued, setIncludeDiscontinued] = useState(() =>
    readSessionBool("includeDiscontinued", true),
  );

  const handleIncludeSecretsChange = useCallback((value: boolean) => {
    setIncludeSecrets(value);
    sessionStorage.setItem("includeSecrets", value.toString());
  }, []);

  const handleIncludeDiscontinuedChange = useCallback((value: boolean) => {
    setIncludeDiscontinued(value);
    sessionStorage.setItem("includeDiscontinued", value.toString());
  }, []);

  const handleSelectSeries = (series: string) => {
    setSelectedSeries((prev) => (prev === series ? "ALL" : series));
  };

  if (loading) return <div className="h-dvh" />;

  return (
    <div className="space-y-8">
      <SyncBanner />
      <CompletionChart
        smiskis={smiskis}
        selectedSeries={selectedSeries}
        onSelectSeries={handleSelectSeries}
        includeDiscontinued={includeDiscontinued}
        onIncludeDiscontinuedChange={handleIncludeDiscontinuedChange}
        includeSecrets={includeSecrets}
        onIncludeSecretsChange={handleIncludeSecretsChange}
      />
      <SmiskiCatalog
        selectedSeries={selectedSeries}
        includeSecrets={includeSecrets}
        includeDiscontinued={includeDiscontinued}
      />
    </div>
  );
}
