import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner"
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clipsterra | Record, Clip & Share Instantly",
  description:
    "Clipsterra is a powerful screen recording platform. Capture your screen in one click, trim the perfect clip, and share a link instantly — no uploads, no friction.",
  keywords: [
    "screen recorder",
    "screen recording",
    "clip sharing",
    "video recording",
    "clipsterra",
    "record screen online",
    "share screen recording",
  ],
  authors: [{ name: "Clipsterra" }],
  creator: "Clipsterra",
  metadataBase: new URL("https://clipsterra.com"), // ← replace with your domain
  openGraph: {
    title: "Clipsterra — Record, Clip & Share Instantly",
    description:
      "Capture your screen in one click and share a link the moment you stop. No uploads, no waiting.",
    url: "https://clipsterra.com",
    siteName: "Clipsterra",
    images: [
      {
        url: "/og-image.png", // ← add a 1200x630 OG image to /public
        width: 1200,
        height: 630,
        alt: "Clipsterra — Screen Recording Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipsterra — Record, Clip & Share Instantly",
    description:
      "Capture your screen in one click and share a link the moment you stop.",
    images: ["/og-image.png"],
    creator: "@clipsterra", // ← replace with your Twitter handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange>
						{children}
						 <Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
