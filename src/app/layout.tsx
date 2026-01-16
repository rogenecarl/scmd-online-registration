import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/context/QueryProvider";
import { SessionProvider } from "@/components/providers";
import { getServerSession } from "@/lib/auth-server";
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SCMD Event Registration",
  description: "Event registration platform for SCMD churches. Register delegates for church events, manage approvals, and coordinate across divisions.",
  icons: {
    icon: "/logo.webp",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch session server-side - uses cookie cache, no waterfall
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <SessionProvider initialSession={session}>
            <NextTopLoader showSpinner={false} height={2} color="#000000" />
            <Toaster position="bottom-right" />
            <main className="min-h-screen">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
