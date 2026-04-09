import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MiINAPI — Instituto Nacional de Propiedad Industrial",
  description:
    "Plataforma ciudadana digital para gestionar tus trámites de propiedad industrial: marcas, patentes y diseños industriales.",
  keywords: ["INAPI", "marcas", "patentes", "propiedad industrial", "Chile"],
  authors: [{ name: "INAPI" }],
  openGraph: {
    title: "MiINAPI",
    description: "Gestiona tus trámites de propiedad industrial en Chile",
    locale: "es_CL",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased bg-[--bg-base]">
        <div className="app-frame">{children}</div>
      </body>
    </html>
  );
}
