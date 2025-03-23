import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "TK Production Film | Best Photography & Cinematography",
  description = "Capture your special moments with TK Production Film. We offer expert wedding, pre-wedding, engagement, and event photography services. Book now!",
  keywords = "photography, cinematography, wedding photography, pre-wedding, baby shower, birthday photography, civil marriage, engagement portraits, TK Production Film",
  url = "https://tkproductionfilm.com",
  author = "TK Production Film",
}) => {
  return (
    <Helmet>
      {/* ✅ Charset & Language */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="Content-Language" content="en" />

      {/* ✅ Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* ✅ Canonical URL */}
      <link rel="canonical" href={url} />

      {/* ✅ Open Graph (Facebook, Instagram) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://tkproductionfilm.com/logo.png"
      />

      {/* ✅ Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://tkproductionfilm.com/logo.png"
      />

      {/* ✅ Structured Data (Local Business + Organization) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "TK Production Film",
          url: url,
          description: description,
          logo: "https://tkproductionfilm.com/logo.png",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+44 7884 537171",
              contactType: "customer support",
              areaServed: "GB",
              availableLanguage: "English",
            },
            {
              "@type": "ContactPoint",
              telephone: "+91 9725621316",
              contactType: "customer support",
              areaServed: "IN",
              availableLanguage: "English, Hindi",
            },
          ],
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "506a Ladymargret Road",
              addressLocality: "Southall",
              addressRegion: "London",
              postalCode: "UB1 2NP",
              addressCountry: "GB",
            },
            {
              "@type": "PostalAddress",
              streetAddress:
                "Nathani Complex Blue Stars Building 6th Floor 604",
              addressLocality: "Near Millenium Hospital, Kausa Mumbra",
              addressRegion: "Thane",
              postalCode: "400612",
              addressCountry: "IN",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "Main Bazar Near SBI Bank",
              addressLocality: "Diu",
              postalCode: "362520",
              addressCountry: "IN",
            },
          ],
          sameAs: [
            "https://www.youtube.com/@tkproductionfilm",
            "https://www.instagram.com/tk_production_film",
            "https://www.facebook.com/tkproductionfilm",
            "https://www.tiktok.com/@takproductionsltd",
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
