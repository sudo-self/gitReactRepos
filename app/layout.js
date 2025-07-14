import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Search Github Repos & Pages",
  description: "Github Repos & Pages API. Search Username with optional download",
  metadataBase: new URL("https://gitreactrepos.vercel.app"),
  authors: [{ name: "sudo-self" }],
  openGraph: {
    title: "Search Github Repos & Pages",
    description: "Github Repos & Pages API. Search Username with optional download",
    url: "https://gitreactrepos.vercel.app",
    siteName: "Search Github Repos & Pages",
    images: [
      {
        url: "https://gitreactrepos.vercel.app/gitrepoOG.png",
        width: 1200,
        height: 630,
        alt: "GitHub Repos & Pages",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Github Repos & Pages",
    description: "Github Repos & Pages API. Search Username with optional download",
    images: ["https://gitreactrepos.vercel.app/gitrepoOG.png"],
    site: "@sudo-self",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


