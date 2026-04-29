import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import {
  getCmsData,
  contactInfo,
  servicesCatalog,
  textBlock,
} from "@/lib/cms";
import { toService } from "@/data/services";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  const brand = textBlock(cms, "general_brand_name").title || "IT Global Services SRL";
  const desc =
    textBlock(cms, "general_meta_description").body ||
    "Professional IT solutions — computer repairs, cybersecurity, cloud services, managed IT, software development, and more.";
  return {
    title: brand,
    description: desc,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cms = await getCmsData();
  const services = servicesCatalog(cms).map(toService);
  const contact = contactInfo(cms);
  const brandName =
    textBlock(cms, "general_brand_name").title || "IT Global Services SRL";
  const footerDescription =
    textBlock(cms, "footer_description").body ||
    "Your trusted partner for comprehensive IT solutions.";

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body antialiased">
        <ScrollToTop />
        <Header services={services} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer
          description={footerDescription}
          contact={contact}
          services={services}
          brandName={brandName}
        />
      </body>
    </html>
  );
}
