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
    <Card className="border-green-800/10 bg-green-50">
      <CardContent>
        <div className="flex items-center gap-3">
          <CloudOff className="h-5 w-5 text-green-800" />
          <div>
            <p className="font-semibold text-green-800">
              Your collection is saved locally
            </p>
            <p className="text-sm text-green-800/50">
              Sign in to save your collection to the cloud and access it from
              any device
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
