import ContactPageContent from "./ContactPageContent";
import { getCmsData, textBlock, contactInfo } from "@/lib/cms";

export const metadata = {
  title: "Contact — IT Global Services SRL",
  description:
    "Get in touch with IT Global Services SRL. We are ready to help with your IT needs.",
};

export default async function ContactPage() {
  const cms = await getCmsData();
  return (
    <ContactPageContent
      bannerTitle={textBlock(cms, "contact_banner_title").title ?? "Contact Us"}
      bannerSubtitle={textBlock(cms, "contact_banner_subtitle").body ?? ""}
      formHeading={textBlock(cms, "contact_form_heading").title ?? "Send Us a Message"}
      contact={contactInfo(cms)}
    />
  );
}
