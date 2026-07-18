"use client";

import { useMemo, useState } from "react";

import { CatalogFilter, CatalogToolbar, SmiskiTile } from "@/components";
import { DISCONTINUED_SERIES, SMISKI_DATA } from "@/lib";
import { useSmiski } from "@/providers";

type Props = {
  selectedSeries: string;
  includeSecrets: boolean;
  includeDiscontinued: boolean;
};

function readSessionCatalogFilter(): CatalogFilter {
  if (typeof window === "undefined") return "all";
  const saved = sessionStorage.getItem("catalogFilter");
  return saved ? (saved as CatalogFilter) : "all";
}

export function SmiskiCatalog({
  selectedSeries,
  includeSecrets,
  includeDiscontinued,
}: Props) {
  const { smiskis, addSmiski, incrementCount, decrementCount } = useSmiski();
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilter>(
    readSessionCatalogFilter,
  );

  const allSeries = useMemo(() => Object.keys(SMISKI_DATA), []);

  const visibleSeries = useMemo(
    () =>
      includeDiscontinued
        ? allSeries
        : allSeries.filter((s) => !DISCONTINUED_SERIES.includes(s)),
    [allSeries, includeDiscontinued],
  );

  const handleCatalogFilterChange = (filter: CatalogFilter) => {
    setCatalogFilter(filter);
    sessionStorage.setItem("catalogFilter", filter);
  };

  // Get Smiski from collection if it exists
  const getSmiskiFromCollection = (name: string, series: string) => {
    return smiskis.find((s) => s.name === name && s.series === series);
  };

  // Handle adding a Smiski to collection
  const handleAddSmiski = (name: string, series: string, isSecret: boolean) => {
    const existingSmiski = getSmiskiFromCollection(name, series);
    if (existingSmiski) incrementCount(existingSmiski.id);
    else addSmiski({ name, series, isSecret });
  };

  // Handle removing a Smiski from collection
  const handleRemoveSmiski = (name: string, series: string) => {
    const existingSmiski = getSmiskiFromCollection(name, series);
    if (existingSmiski) decrementCount(existingSmiski.id);
  };

  const visibleFigures = useMemo(() => {
    // Base figures scoped by the selected series, unfiltered by
    // include-discontinued/secrets so the "Secrets"/"Discontinued" filters
    // can still surface them on request.
    const baseSeries =
      selectedSeries === "ALL"
        ? catalogFilter === "discontinued"
          ? allSeries
          : visibleSeries
        : [selectedSeries];

    const figures = baseSeries.flatMap((s) =>
      (SMISKI_DATA[s] ?? []).map((f) => ({ ...f, series: s })),
    );

    return figures.filter((figure) => {
      if (catalogFilter === "secrets") return figure.isSecret;
      if (catalogFilter === "discontinued")
        return DISCONTINUED_SERIES.includes(figure.series);

      if (!includeSecrets && figure.isSecret) return false;

      const collected = smiskis.find(
        (s) => s.name === figure.name && s.series === figure.series,
      );
      const count = collected?.count ?? 0;

      if (catalogFilter === "owned" && count === 0) return false;
      if (catalogFilter === "missing" && count > 0) return false;

      return true;
    });
  }, [
    selectedSeries,
    allSeries,
    visibleSeries,
    catalogFilter,
    includeSecrets,
    smiskis,
  ]);

  return (
    <div className="space-y-4">
      <CatalogToolbar
        catalogFilter={catalogFilter}
        onCatalogFilterChange={handleCatalogFilterChange}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleFigures.map((figure) => {
          const count =
            getSmiskiFromCollection(figure.name, figure.series)?.count ?? 0;

          return (
            <SmiskiTile
              key={`${figure.series}-${figure.name}`}
              name={figure.name}
              series={figure.series}
              isSecret={figure.isSecret}
              count={count}
              onAdd={() =>
                handleAddSmiski(figure.name, figure.series, figure.isSecret)
              }
              onRemove={() => handleRemoveSmiski(figure.name, figure.series)}
            />
          );
        })}

        {visibleFigures.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground py-8">
            No figures match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
