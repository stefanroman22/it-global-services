export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string; // SVG path data for a simple icon
  fullDescription: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "computer-repairs",
    title: "Computer Repairs",
    shortDescription:
      "Fast, reliable computer repair services for desktops and laptops. We diagnose and fix hardware and software issues efficiently.",
    icon: "M9 17V15M12 17V13M15 17V11M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z",
    fullDescription:
      "At IT Global Services SRL, we provide comprehensive computer repair services for both businesses and individuals. Our certified technicians handle everything from hardware failures and component replacements to software troubleshooting, virus removal, and system optimization. We work with all major brands and configurations, ensuring your equipment runs at peak performance with minimal downtime.",
    features: [
      "Hardware diagnostics and component replacement",
      "Software troubleshooting and reinstallation",
      "Virus and malware removal",
      "Performance optimization and upgrades",
      "Data recovery from damaged drives",
      "Same-day service available for urgent repairs",
    ],
  },
  {
    slug: "network-infrastructure",
    title: "Network Infrastructure",
    shortDescription:
      "Design, installation, and maintenance of robust network systems tailored for businesses of all sizes.",
    icon: "M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3",
    fullDescription:
      "We design and implement scalable network infrastructure solutions that form the backbone of your business operations. From initial planning and cabling to configuration and ongoing maintenance, our team ensures your network is fast, secure, and reliable. We work with enterprise-grade equipment and follow industry best practices to deliver solutions that grow with your business.",
    features: [
      "Network design and architecture planning",
      "Structured cabling and installation",
      "Router and switch configuration",
      "Wireless network deployment",
      "Network monitoring and management",
      "Performance testing and optimization",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity Solutions",
    shortDescription:
      "Protect your business with advanced cybersecurity measures, threat monitoring, and compliance strategies.",
    icon: "M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z",
    fullDescription:
      "In today's digital landscape, cybersecurity is not optional — it's essential. IT Global Services SRL provides comprehensive security solutions that protect your data, systems, and reputation. We conduct thorough risk assessments, implement multi-layered defenses, and provide ongoing monitoring to detect and respond to threats before they cause damage.",
    features: [
      "Security audits and vulnerability assessments",
      "Firewall and intrusion detection systems",
      "Endpoint protection and antivirus management",
      "Employee security awareness training",
      "Incident response planning",
      "Regulatory compliance consulting (GDPR, ISO 27001)",
    ],
  },
  {
    slug: "cloud-services",
    title: "Cloud Services",
    shortDescription:
      "Migrate, manage, and optimize your cloud infrastructure with tailored solutions for maximum efficiency.",
    icon: "M3 15C3 17.2091 4.79086 19 7 19H16C18.7614 19 21 16.7614 21 14C21 11.2386 18.7614 9 16 9C16 6.23858 13.7614 4 11 4C8.23858 4 6 6.23858 6 9C4.34315 9 3 10.3431 3 12V15Z",
    fullDescription:
      "Leverage the power of cloud computing to transform your business operations. We help organizations migrate to the cloud seamlessly, optimize their cloud spending, and manage their cloud environments with expertise across AWS, Azure, and Google Cloud Platform. Whether you need public, private, or hybrid cloud solutions, we tailor our approach to your specific requirements.",
    features: [
      "Cloud migration strategy and execution",
      "Multi-cloud and hybrid cloud management",
      "Cloud cost optimization",
      "Infrastructure as Code (IaC) implementation",
      "Cloud security and compliance",
      "24/7 cloud monitoring and support",
    ],
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    shortDescription:
      "Strategic IT consulting to align technology with your business goals and drive digital transformation.",
    icon: "M9.663 17H14.336M12 3V4M18.364 5.636L17.657 6.343M21 12H20M4 12H3M6.343 6.343L5.636 5.636M8 17C6.34315 15.3431 6.34315 12.6569 8 11C9.65685 9.34315 12.3431 9.34315 14 11C15.6569 12.6569 15.6569 15.3431 14 17H8Z",
    fullDescription:
      "Our IT consulting services provide the strategic guidance your business needs to make informed technology decisions. We work closely with your leadership team to understand your objectives, assess your current technology landscape, and develop a roadmap that drives efficiency, innovation, and competitive advantage. From digital transformation to IT governance, we deliver actionable insights and measurable results.",
    features: [
      "Technology roadmap development",
      "Digital transformation strategy",
      "IT budget planning and optimization",
      "Vendor selection and management",
      "Process automation assessment",
      "IT governance and compliance frameworks",
    ],
  },
  {
    slug: "data-backup-recovery",
    title: "Data Backup & Recovery",
    shortDescription:
      "Comprehensive backup solutions and disaster recovery planning to keep your data safe and accessible.",
    icon: "M4 7V4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V7M4 7H20M4 7V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V7M8 11H16M8 15H12",
    fullDescription:
      "Data is the lifeblood of modern business. IT Global Services SRL provides robust backup and disaster recovery solutions that ensure your critical data is always protected and recoverable. We implement automated backup systems, test recovery procedures regularly, and design business continuity plans that minimize downtime and data loss in any scenario.",
    features: [
      "Automated local and cloud backup",
      "Disaster recovery planning and testing",
      "Business continuity strategies",
      "Real-time data replication",
      "Rapid restore capabilities",
      "Compliance-ready data retention policies",
    ],
  },
  {
    slug: "software-development",
    title: "Software Development",
    shortDescription:
      "Custom software solutions designed to streamline your operations and address unique business challenges.",
    icon: "M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8",
    fullDescription:
      "We build custom software solutions that solve real business problems. Our development team works with modern technologies and agile methodologies to deliver applications that are scalable, maintainable, and user-friendly. From web and mobile applications to enterprise systems and API integrations, we turn your vision into powerful digital tools.",
    features: [
      "Custom web application development",
      "Mobile app development (iOS & Android)",
      "API design and integration",
      "Legacy system modernization",
      "Database design and optimization",
      "Agile development with iterative delivery",
    ],
  },
  {
    slug: "managed-it-services",
    title: "Managed IT Services",
    shortDescription:
      "Proactive IT management and support so you can focus on your core business without technology worries.",
    icon: "M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.7872 18.3938 9.0588 18.4975 9.30938C18.6013 9.55996 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6002 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z",
    fullDescription:
      "Let us handle your IT so you can focus on growing your business. Our managed IT services provide comprehensive, proactive technology management that prevents problems before they occur. With 24/7 monitoring, regular maintenance, and a dedicated team of experts, we ensure your IT infrastructure runs smoothly and efficiently at all times.",
    features: [
      "24/7 system monitoring and alerting",
      "Proactive maintenance and patch management",
      "Help desk and end-user support",
      "IT asset management and lifecycle planning",
      "Monthly performance reporting",
      "Scalable service plans for growing businesses",
    ],
  },
  {
    slug: "voip-communications",
    title: "VoIP",
    shortDescription:
      "Modern VoIP phone systems and unified communications to keep your team connected and productive.",
    icon: "M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38278L7.96701 10.5114C9.06925 12.9728 11.0272 14.9307 13.4886 16.033L14.6172 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z",
    fullDescription:
      "Transform your business communications with our VoIP and unified communications solutions. We deploy feature-rich phone systems that reduce costs, improve call quality, and integrate seamlessly with your existing tools. Whether you need a simple phone system or a comprehensive unified communications platform, we design solutions that enhance collaboration and productivity.",
    features: [
      "VoIP phone system design and deployment",
      "Unified communications integration",
      "Video conferencing solutions",
      "Call center and IVR systems",
      "Mobile integration for remote teams",
      "Cost analysis and migration planning",
    ],
  },
  {
    slug: "hardware-procurement",
    title: "Hardware Procurement",
    shortDescription:
      "Source and deploy the right hardware for your business needs with expert guidance and competitive pricing.",
    icon: "M9 3H5C3.89543 3 3 3.89543 3 5V9M9 3H15M9 3V9M21 9V5C21 3.89543 20.1046 3 19 3H15M15 3V9M3 9V15M3 9H9M21 9V15M21 9H15M3 15V19C3 20.1046 3.89543 21 5 21H9M3 15H9M21 15V19C21 20.1046 20.1046 21 19 21H15M21 15H15M9 21H15M9 21V15M15 21V15M9 15H15",
    fullDescription:
      "Making the right hardware decisions can be complex. IT Global Services SRL simplifies the process by providing expert procurement services that match the right technology to your business needs and budget. We leverage our vendor relationships to secure competitive pricing on enterprise-grade equipment, handle logistics, and manage the complete deployment process.",
    features: [
      "Hardware needs assessment and specification",
      "Vendor negotiation and competitive pricing",
      "Bulk ordering and logistics management",
      "Equipment deployment and configuration",
      "Warranty management and support",
      "Hardware lifecycle and refresh planning",
    ],
  },
  {
    slug: "web-hosting-maintenance",
    title: "Web Hosting & Maintenance",
    shortDescription:
      "Reliable web hosting with ongoing maintenance, security updates, and performance optimization.",
    icon: "M5 12H3L12 3L21 12H19M5 12V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V12M9 21V15C9 13.8954 9.89543 13 11 13H13C14.1046 13 15 13.8954 15 15V21",
    fullDescription:
      "Your website is your digital storefront, and it needs to be fast, secure, and always online. We provide managed web hosting services with proactive maintenance, regular backups, security updates, and performance monitoring. Our hosting infrastructure is built for reliability, and our team ensures your site stays optimized and protected around the clock.",
    features: [
      "Managed hosting on high-performance servers",
      "SSL certificate management",
      "Regular security updates and patching",
      "Daily backups with quick restore",
      "Performance monitoring and optimization",
      "Uptime guarantee with SLA",
    ],
  },
];

// Helper to find a service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
