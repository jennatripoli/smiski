"use client";

import { Gem, Minus, Plus } from "lucide-react";
import Image from "next/image";

import { Badge, Button } from "@/components";
import { cn, SERIES_COLORS } from "@/lib";

type Props = {
  name: string;
  series: string;
  isSecret: boolean;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
};

export function SmiskiTile({
  name,
  series,
  isSecret,
  count,
  onAdd,
  onRemove,
}: Props) {
  const seriesColor = SERIES_COLORS[series] || SERIES_COLORS["Custom"];

  return (
    <div className="relative group">
      <div
        className={cn(
          "aspect-square rounded-md shadow-md transition-all",
          seriesColor,
        )}
      >
        <div
          className="absolute inset-0 flex items-center justify-center p-6"
          onClick={() => count === 0 && onAdd()}
        >
          <div className="w-full h-full rounded-md overflow-clip mb-10">
            <Image
              src={`/smiski/smiskis/${series}/${name}.png`}
              alt={name}
              width={200}
              height={200}
              className={cn(
                "object-cover h-full w-full transition-all duration-150",
                count === 0 && "opacity-50",
              )}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/smiski/placeholder.png";
              }}
            />
          </div>
        </div>

        {isSecret && (
          <div className="absolute top-2 right-2">
            <div className="bg-primary rounded-md p-1">
              <Gem className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        )}

        {count > 0 && (
          <Badge
            variant="default"
            className="absolute top-2 left-2 bg-primary text-primary-foreground font-bold min-w-6 h-6 flex items-center justify-center"
          >
            {count}
          </Badge>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-background/80 backdrop-blur-sm p-2 flex flex-row justify-between items-center gap-2 rounded-b-md">
          <p className="text-sm font-medium truncate">{name}</p>

          <div className="flex gap-1">
            {count > 0 && (
              <Button
                variant="outline"
                size="icon"
                className="size-6"
                onClick={onRemove}
                title="Remove one"
              >
                <Minus />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              className="size-6"
              onClick={onAdd}
              title={count > 0 ? "Add one" : "Add to collection"}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
