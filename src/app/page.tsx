import { Suspense } from "react";
import { SmiskiApp, LoadingSkeleton, UserMenu } from "@/components";
import { AuthProvider, SmiskiProvider, ThemeProvider } from "@/providers";

export default function Home() {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
          <div className="container max-w-5xl mx-auto px-4 pt-6 pb-12">
            <div className="flex justify-between items-center gap-4 mb-6">
              <h1 className="text-3xl font-bold mb-2">Smiski Tracker</h1>
              <UserMenu />
            </div>
            <SmiskiProvider>
              <Suspense fallback={<LoadingSkeleton />}>
                <SmiskiApp />
              </Suspense>
            </SmiskiProvider>
          </div>
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}
