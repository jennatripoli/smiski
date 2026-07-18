"use client";

import { Button } from "@/components";

export type CatalogFilter =
  "all" | "owned" | "missing" | "secrets" | "discontinued";

type Props = {
  catalogFilter: CatalogFilter;
  onCatalogFilterChange: (filter: CatalogFilter) => void;
};

const FILTERS: { value: CatalogFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "owned", label: "Owned" },
  { value: "missing", label: "Missing" },
  { value: "secrets", label: "Secrets" },
  { value: "discontinued", label: "Discontinued" },
];

export function CatalogToolbar({
  catalogFilter,
  onCatalogFilterChange,
}: Props) {
  return (
    <div className="flex gap-1 flex-wrap">
      {FILTERS.map((filter) => (
        <Button
          key={filter.value}
          type="button"
          size="sm"
          variant={catalogFilter === filter.value ? "default" : "outline"}
          onClick={() => onCatalogFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
