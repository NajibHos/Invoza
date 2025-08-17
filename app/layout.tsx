import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/lib/theme/theme-provider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Invoza",
  description: "Your ultimate productiity app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ibmPlexSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Header />
        <main className="h-auto w-full">
          {children}
          <Toaster
            position="top-right"
            richColors
            className="!bg-white dark:!bg-dark"
          />
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
