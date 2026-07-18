import Image from "next/image";

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
            <div className="flex justify-between items-center gap-4 mb-6">
              <h1 className="flex items-center gap-2 text-3xl font-bold">
                <Image src="/smiski/icon.png" alt="" width={32} height={32} />
                Smiski Tracker
              </h1>
              <UserMenu />
            </div>
            <SmiskiProvider>
              <SmiskiApp />
            </SmiskiProvider>
            <footer className="mt-12 pt-6 border-t text-xs text-muted-foreground text-center">
              Smiski is a trademark of © Dreams Inc. Names and images here are
              used for non-commercial purposes only. This project is not
              affiliated with or endorsed by Dreams Inc.
            </footer>
          </div>
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
}
