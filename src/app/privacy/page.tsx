import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — My Smiski Tracker",
  description: "How My Smiski Tracker collects, uses, and stores your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-2xl mx-auto px-4 py-12 space-y-8">
        <div>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Back to My Smiski Tracker
          </Link>
          <h1 className="text-3xl font-bold mt-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: July 18, 2026
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed">
          <section className="space-y-2">
            <p>
              My Smiski Tracker is an independent, fan-made collection tracker
              for Smiski figures. It is not affiliated with, sponsored by, or
              endorsed by Dreams Inc. This policy explains what information the
              app collects and how it&apos;s used.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Information We Collect</h2>
            <p>
              <strong>If you don&apos;t sign in:</strong> your collection is
              stored only in your browser&apos;s local storage. It never leaves
              your device and we never see it.
            </p>
            <p>
              <strong>If you sign in with Google:</strong> we receive your name,
              email address, and profile picture from Google, solely to identify
              your account. We only request basic sign-in information — never
              access to your Gmail, Drive, or other Google data.
            </p>
            <p>
              <strong>If you sign in with email and password:</strong> we store
              your email address. Your password is handled entirely by our
              authentication provider, Supabase; we never see or store it
              ourselves.
            </p>
            <p>
              <strong>Collection data:</strong> once signed in, the Smiski
              figures you mark as owned (name, series, secret status, and
              quantity) are stored under your account so your collection syncs
              across devices.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">How We Use Information</h2>
            <p>
              Your information is used only to authenticate you and to save and
              sync your collection between devices. We do not use your data for
              advertising or analytics, and we do not sell or share it with
              third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Where Data Is Stored</h2>
            <p>
              Account and collection data is stored with{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Supabase
              </a>
              , our backend provider. Google sign-in is handled by Google in
              accordance with{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">
              Data Retention and Deletion
            </h2>
            <p>
              You can sign out at any time. To request deletion of your account
              and all associated collection data, contact us at the email
              address below.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Children&apos;s Privacy</h2>
            <p>
              My Smiski Tracker is not directed at children under 13, and we do
              not knowingly collect information from them.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be
              posted on this page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Contact</h2>
            <p>
              Questions or data deletion requests can be sent to{" "}
              <a href="mailto:jennamt1282@gmail.com" className="underline">
                jennamt1282@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
