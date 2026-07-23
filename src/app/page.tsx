import Image from "next/image";
import Link from "next/link";

import { SmiskiApp, UserMenu } from "@/components";
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
            <div className="flex justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="flex items-center gap-2 text-3xl font-bold">
                  <Image src="/smiski/icon.png" alt="" width={32} height={32} />
                  My Smiski Tracker
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your Smiski collection.
                </p>
              </div>
              <UserMenu />
            </div>
            <SmiskiProvider>
              <SmiskiApp />
            </SmiskiProvider>
            <footer className="mt-12 pt-6 border-t text-xs text-muted-foreground text-center space-y-1">
              <p>
                Smiski and the Smiski figure designs are trademarks and/or
                copyrights of Dreams Inc., which does not sponsor, authorize, or
                endorse this site.
              </p>
              <p className="my-2">
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
              </p>
            </footer>
          </div>
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}
