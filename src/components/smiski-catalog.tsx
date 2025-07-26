"use client";

import { useState } from "react";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
} from "@/components";
import { Plus, Minus, Gem } from "lucide-react";
import { cn, SMISKI_DATA, SERIES_COLORS } from "@/lib";
import { useSmiski } from "@/providers";
import Image from "next/image";

export function SmiskiCatalog() {
  const { smiskis, addSmiski, incrementCount, decrementCount } = useSmiski();
  const [selectedSeries, setSelectedSeries] = useState("ALL");

  const allSeries = Object.keys(SMISKI_DATA);

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

  return (
    <div className="space-y-4">
      <Tabs defaultValue={selectedSeries} onValueChange={setSelectedSeries}>
        {/* Wrapped tabs that flow to multiple lines */}
        <div className="w-full">
          <TabsList className="h-auto p-1 flex flex-wrap justify-start gap-1 bg-muted">
            <TabsTrigger
              key="ALL"
              value="ALL"
              className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              ALL ⋆⭒˚｡⋆
            </TabsTrigger>
            {allSeries.map((series) => (
              <TabsTrigger
                key={series}
                value={series}
                className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                {series}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {["ALL", ...allSeries].map((series) => {
          const smiskisToRender =
            series === "ALL"
              ? allSeries.flatMap((s) =>
                  SMISKI_DATA[s].map((smiski) => ({ ...smiski, series: s }))
                )
              : SMISKI_DATA[series].map((smiski) => ({ ...smiski, series }));

          return (
            <TabsContent key={series} value={series} className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {smiskisToRender.map((smiski) => {
                  const collectionSmiski = getSmiskiFromCollection(
                    smiski.name,
                    smiski.series
                  );
                  const count = collectionSmiski?.count || 0;
                  const seriesColor =
                    SERIES_COLORS[smiski.series] || SERIES_COLORS["Custom"];

                  return (
                    <div
                      key={`${smiski.series}-${smiski.name}`}
                      className="relative group"
                    >
                      <div
                        className={cn(
                          "aspect-square rounded-md shadow-md transition-all",
                          seriesColor
                        )}
                      >
                        <div
                          className="absolute inset-0 flex items-center justify-center p-4"
                          onClick={() =>
                            count === 0 &&
                            handleAddSmiski(
                              smiski.name,
                              smiski.series,
                              smiski.isSecret
                            )
                          }
                        >
                          <div className="w-full h-full rounded-md overflow-clip">
                            <Image
                              src={`/smiskis/${smiski.series}/${smiski.name}.png`}
                              alt={smiski.name}
                              width={200}
                              height={200}
                              className={cn(
                                "object-cover h-full w-full transition-all duration-150",
                                count === 0 && "opacity-50"
                              )}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "/placeholder.png";
                              }}
                            />
                          </div>
                        </div>

                        {smiski.isSecret && (
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
                          <p className="text-sm font-medium truncate">
                            {smiski.name}
                          </p>

                          <div className="flex gap-1">
                            {count > 0 && (
                              <Button
                                variant="outline"
                                size="icon"
                                className="size-6"
                                onClick={() =>
                                  handleRemoveSmiski(smiski.name, smiski.series)
                                }
                                title="Remove one"
                              >
                                <Minus />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="icon"
                              className="size-6"
                              onClick={() =>
                                handleAddSmiski(
                                  smiski.name,
                                  smiski.series,
                                  smiski.isSecret
                                )
                              }
                              title={
                                count > 0 ? "Add one" : "Add to collection"
                              }
                            >
                              <Plus />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
