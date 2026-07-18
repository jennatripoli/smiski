"use client";

import { Check } from "lucide-react";

import { Card, CardContent, Switch } from "@/components";
import { cn, computeCompletionStats, SERIES_COLORS, Smiski } from "@/lib";

type Props = {
  smiskis: Smiski[];
  selectedSeries: string;
  onSelectSeries: (series: string) => void;
  includeDiscontinued: boolean;
  onIncludeDiscontinuedChange: (include: boolean) => void;
  includeSecrets: boolean;
  onIncludeSecretsChange: (include: boolean) => void;
};

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CompletionChart({
  smiskis,
  selectedSeries,
  onSelectSeries,
  includeDiscontinued,
  onIncludeDiscontinuedChange,
  includeSecrets,
  onIncludeSecretsChange,
}: Props) {
  const { uniqueOwned, totalPossible, totalOwnedCount, bySeries } =
    computeCompletionStats(smiskis, {
      includeDiscontinued,
      includeSecrets,
    });
  const pct = totalPossible === 0 ? 0 : uniqueOwned / totalPossible;
  const dashOffset = CIRCUMFERENCE * (1 - pct);

  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row gap-x-6 gap-y-2.5 items-center">
        <div className="flex flex-row sm:flex-col items-center gap-3 shrink-0">
          <div className="relative">
            <svg
              width={140}
              height={140}
              viewBox="0 0 120 120"
              className="-rotate-90"
            >
              <circle
                cx={60}
                cy={60}
                r={RADIUS}
                fill="none"
                stroke="var(--muted)"
                strokeWidth={10}
              />
              <circle
                cx={60}
                cy={60}
                r={RADIUS}
                fill="none"
                stroke="var(--primary)"
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                className="transition-[stroke-dashoffset] duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">
                {Math.round(pct * 100)}%
              </span>
              <span className="text-xs text-muted-foreground">
                {uniqueOwned}/{totalPossible}
              </span>
              <span className="text-xs text-muted-foreground mt-1.5">
                ({totalOwnedCount} total)
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <Switch
                checked={includeDiscontinued}
                onCheckedChange={onIncludeDiscontinuedChange}
              />
              <span className="text-xs text-muted-foreground">
                Discontinued?
              </span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={includeSecrets}
                onCheckedChange={onIncludeSecretsChange}
              />
              <span className="text-xs text-muted-foreground">Secrets?</span>
            </label>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {bySeries.map(({ series, owned, total }) => {
              const complete = total > 0 && owned === total;
              const seriesColor =
                SERIES_COLORS[series] || SERIES_COLORS["Custom"];

              return (
                <button
                  key={series}
                  type="button"
                  onClick={() => onSelectSeries(series)}
                  className={cn(
                    "flex flex-col gap-1 rounded-md border p-2 text-left transition-colors hover:bg-secondary hover:cursor-pointer",
                    selectedSeries === series && "ring-2 ring-ring",
                  )}
                  title={`${series}: ${owned}/${total}`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-medium truncate">
                      {series}
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] text-muted-foreground">
                        {owned}/{total}
                      </span>
                      {complete && (
                        <Check className="size-3 text-primary shrink-0" />
                      )}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", seriesColor)}
                      style={{
                        width: `${total === 0 ? 0 : (owned / total) * 100}%`,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
