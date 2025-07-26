"use client";

import { Card, CardContent } from "@/components";
import { Check, Star, X } from "lucide-react";
import { ReactNode } from "react";
import { SMISKI_DATA } from "@/lib";

type Props = {
  total: number;
  unique: number;
};

export function Summary({ total, unique }: Props) {
  // Calculate total possible Smiskis from all series
  const all = Object.values(SMISKI_DATA).reduce(
    (total, series) => total + series.length,
    0
  );

  const missing = all - unique;

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatisticCard
        title="Total"
        value={total}
        icon={<Check className="size-4" />}
      />
      <StatisticCard
        title="Unique"
        value={unique}
        icon={<Star className="size-4" />}
      />
      <StatisticCard
        title="Missing"
        value={missing}
        icon={<X className="size-4" />}
      />
    </div>
  );
}

type StatisticCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
};

function StatisticCard({ title, value, icon }: StatisticCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="bg-muted p-1 rounded-full">{icon}</div>
        </div>
        <h3 className="text-2xl font-bold">{value}</h3>
      </CardContent>
    </Card>
  );
}
