import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import {
  getCmsData,
  textBlock,
  image,
  servicesCatalog,
  keyFeatures,
} from "@/lib/cms";
import { toService } from "@/data/services";

export default async function HomePage() {
  const cms = await getCmsData();
  const tagline = textBlock(cms, "general_tagline").title ?? "";
  const heroSubhead = textBlock(cms, "home_hero_subhead").body ?? "";
  const logo = image(cms, "general_logo");
  const services = servicesCatalog(cms).map(toService);
  const features = keyFeatures(cms);

  // Tagline split: take last word as the accent, rest as base
  let baseTagline = tagline;
  let accent: string | undefined;
  const words = tagline.split(/\s+/);
  if (words.length > 1) {
    accent = words.slice(-2).join(" ");
    baseTagline = words.slice(0, -2).join(" ");
  }

  return (
    <div className="page-home">
      <Hero
        tagline={baseTagline}
        taglineAccent={accent}
        subhead={heroSubhead}
        logoUrl={logo.url ?? "/company-logo.png"}
        logoAlt={logo.alt ?? "IT Global Services"}
      />
      <ServicesGrid
        services={services}
        header={textBlock(cms, "home_services_header").title ?? "Our Services"}
        subhead={textBlock(cms, "home_services_subhead").body ?? ""}
      />
      <WhyChooseUs
        eyebrow={textBlock(cms, "home_why_eyebrow").title ?? "Why Choose Us"}
        header={textBlock(cms, "home_why_header").title ?? ""}
        subhead={textBlock(cms, "home_why_subhead").body ?? ""}
        features={features}
      />
    </div>
  );
}
