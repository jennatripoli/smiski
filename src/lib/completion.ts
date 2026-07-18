import { DISCONTINUED_SERIES, Smiski, SMISKI_DATA } from "@/lib";

export type SeriesCompletion = {
  series: string;
  owned: number;
  total: number;
};

export type CompletionStats = {
  uniqueOwned: number;
  totalPossible: number;
  totalOwnedCount: number;
  bySeries: SeriesCompletion[];
};

export type CompletionOptions = {
  includeDiscontinued: boolean;
  includeSecrets: boolean;
};

export function computeCompletionStats(
  smiskis: Smiski[],
  { includeDiscontinued, includeSecrets }: CompletionOptions,
): CompletionStats {
  const seriesEntries = Object.entries(SMISKI_DATA).filter(
    ([series]) => includeDiscontinued || !DISCONTINUED_SERIES.includes(series),
  );

  const bySeries = seriesEntries.map(([series, figures]) => ({
    series,
    total: figures.filter((f) => includeSecrets || !f.isSecret).length,
    owned: smiskis.filter(
      (s) => s.series === series && (includeSecrets || !s.isSecret),
    ).length,
  }));

  const totalOwnedCount = smiskis
    .filter(
      (s) =>
        (includeDiscontinued || !DISCONTINUED_SERIES.includes(s.series)) &&
        (includeSecrets || !s.isSecret),
    )
    .reduce((sum, s) => sum + s.count, 0);

  return {
    uniqueOwned: bySeries.reduce((sum, s) => sum + s.owned, 0),
    totalPossible: bySeries.reduce((sum, s) => sum + s.total, 0),
    totalOwnedCount,
    bySeries,
  };
}
