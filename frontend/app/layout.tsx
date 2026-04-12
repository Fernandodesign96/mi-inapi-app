import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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

        {/* --- Trackers & Analytics --- */}
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L45VBNJ3X2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L45VBNJ3X2');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "waqm63yeuj");
          `}
        </Script>
      </body>
    </html>
  );
}
