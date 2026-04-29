import { notFound } from "next/navigation";
import { getCmsData, servicesCatalog, contactInfo } from "@/lib/cms";
import { toService } from "@/data/services";
import ServicePageContent from "./ServicePageContent";

export async function generateStaticParams() {
  const cms = await getCmsData();
  return servicesCatalog(cms).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cms = await getCmsData();
  const item = servicesCatalog(cms).find((s) => s.slug === slug);
  if (!item) return { title: "Service Not Found" };
  return {
    title: `${item.title} — IT Global Services SRL`,
    description: item.short_description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cms = await getCmsData();
  const item = servicesCatalog(cms).find((s) => s.slug === slug);
  if (!item) notFound();

  return (
    <ServicePageContent
      service={toService(item)}
      contact={contactInfo(cms)}
    />
  );
}
