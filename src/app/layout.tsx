import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.scss";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "FieldGrow | Business Operating System for Field Service",
  description:
    "Run your field team. Get more customers. Get paid faster. Bring customers back. FieldGrow combines field operations with a Service-to-Growth Engine™.",
  openGraph: {
    title: "FieldGrow",
    description: "Field Service + Customer Growth Platform for Indian service businesses.",
    images: ["/images/hero-fieldgrow.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body>
        <AppProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}