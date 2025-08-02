"use client";

import { Card, CardContent } from "@/components";
import { useAuth, useSmiski } from "@/providers";
import { CloudOff } from "lucide-react";

export function SyncBanner() {
  const { user } = useAuth();
  const { smiskis } = useSmiski();

  // Do not show banner if user is signed in or has no collection
  if (user || smiskis.length === 0) return null;

  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3">
          <CloudOff className="h-5 w-5" />
          <div>
            <p className="font-semibold">
              Your collection is saved locally
            </p>
            <p className="text-sm text-muted-foreground">
              Sign in to save your collection to the cloud and access it from
              any device
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
