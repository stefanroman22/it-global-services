import AboutPageContent from "./AboutPageContent";
import {
  getCmsData,
  textBlock,
  image,
  contactInfo,
  keyFeatures,
} from "@/lib/cms";

export const metadata = {
  title: "About Us — IT Global Services SRL",
  description:
    "Learn about IT Global Services SRL — a trusted IT partner delivering innovative technology solutions.",
};

export default async function AboutPage() {
  const cms = await getCmsData();
  return (
    <AboutPageContent
      bannerTitle={textBlock(cms, "about_banner_title").title ?? "About Us"}
      bannerSubtitle={textBlock(cms, "about_banner_subtitle").body ?? ""}
      introHeading={textBlock(cms, "about_intro_heading").title ?? ""}
      introBody={textBlock(cms, "about_intro_body").body ?? ""}
      mainBody={textBlock(cms, "about_main_body").body ?? ""}
      pillarsHeader={textBlock(cms, "about_pillars_header").title ?? "Why Choose Us"}
      formHeading={textBlock(cms, "about_form_heading").title ?? "Let's Start a Conversation"}
      logoUrl={image(cms, "general_logo").url ?? "/company-logo.png"}
      logoAlt={image(cms, "general_logo").alt ?? "IT Global Services logo"}
      features={keyFeatures(cms)}
      contact={contactInfo(cms)}
    />
  );
}
