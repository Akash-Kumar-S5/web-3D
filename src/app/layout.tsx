import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akash Kumar | Full-Stack Developer",
  description:
    "Interactive 3D portfolio of Akash Kumar — Full-Stack Developer. Explore my work in an immersive underground kingdom.",
  openGraph: {
    title: "Akash Kumar | Full-Stack Developer",
    description:
      "Interactive 3D portfolio — explore projects, skills, and more in an immersive underground kingdom.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzelDecorative.variable} ${cinzel.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
