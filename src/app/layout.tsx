import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Spotlight } from "@/components/effects/Spotlight";
import "./globals.scss";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "FieldGrow | Field Service Management + Growth Platform",
  description:
    "Run your field team. Get more customers. Get paid faster. Bring customers back. FieldGrow is the business operating system for field service businesses.",
  openGraph: {
    title: "FieldGrow",
    description: "Field Service + Customer Growth Platform for service businesses.",
    images: ["/images/hero-fieldgrow.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body>
        <AppProviders>
          <ScrollProgress />
          <Spotlight />
          <Header />
          <main id="top">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
