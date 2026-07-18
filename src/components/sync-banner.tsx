"use client";

import { CloudOff } from "lucide-react";

import { Card, CardContent } from "@/components";
import { useAuth, useSmiski } from "@/providers";

export function SyncBanner() {
  const { user, loading } = useAuth();
  const { smiskis } = useSmiski();

  // Do not show banner if user is signed in or has no collection
  if (loading || user || smiskis.length === 0) return null;

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3 p-1">
          <CloudOff className="size-5" />
          <p className="font-semibold leading-0">
            Sign in to save your collection and access it later.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
