import type { Metadata } from "next";
import { Figtree, Unbounded } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.scss";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
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
    <html lang="en" className={`${unbounded.variable} ${figtree.variable}`}>
      <body>
        <AppProviders>
          <Header />
          <main id="top">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
