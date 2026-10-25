
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quicktools-6in.pages.dev"),
  title: "Free JPG to PNG Converter Online | QuickTools",
  description:
    "Convert JPG to PNG or PNG to JPG online for free with QuickTools. Fast, simple image conversion directly in your browser.",
  applicationName: "QuickTools",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free JPG to PNG Converter Online | QuickTools",
    description:
      "Convert JPG and PNG images online for free with QuickTools.",
    url: "https://quicktools-6in.pages.dev",
    siteName: "QuickTools",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6812886800792017"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
