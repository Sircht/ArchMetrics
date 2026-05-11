export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ArchMetrics",
    applicationCategory: "ArchitectureApplication",
    operatingSystem: "Web",
    description: "Premium architecture calculators with real-time diagrams, validation, and professional exports.",
    offers: { "@type": "Offer", price: "9", priceCurrency: "USD" }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
