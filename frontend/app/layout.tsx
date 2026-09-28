import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { basePath } from "@/next.config";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-slab",
  display: "swap",
});

const iconUrl = `${basePath}/images/inapi-logo.jpg`;

export const metadata: Metadata = {
  title: "MiINAPI — Instituto Nacional de Propiedad Industrial",
  description:
    "Plataforma ciudadana digital para gestionar tus trámites de propiedad industrial: marcas, patentes y diseños industriales.",
  keywords: ["INAPI", "marcas", "patentes", "propiedad industrial", "Chile"],
  authors: [{ name: "INAPI" }],
  icons: {
    icon: [{ url: iconUrl, type: "image/jpeg" }],
    shortcut: iconUrl,
    apple: iconUrl,
  },
  openGraph: {
    title: "MiINAPI",
    description: "Gestiona tus trámites de propiedad industrial en Chile",
    locale: "es_CL",
    type: "website",
    images: [{ url: iconUrl, alt: "INAPI — Gobierno de Chile" }],
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
    <html
      lang="es-CL"
      className={`dark ${roboto.variable} ${robotoSlab.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <Script
          id="miinapi-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('miinapi-theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <div className="app-frame gob-container">{children}</div>

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
