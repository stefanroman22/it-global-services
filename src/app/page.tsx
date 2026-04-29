import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata = {
  title: "IT Global Services SRL — Your Trusted IT Partner",
  description:
    "Comprehensive IT solutions including computer repairs, cybersecurity, cloud services, managed IT, and software development. Empowering businesses through technology.",
};

export default function HomePage() {
  return (
    <div className="page-home">
      <Hero />
      <ServicesGrid />
      <WhyChooseUs />
    </div>
  );
}
