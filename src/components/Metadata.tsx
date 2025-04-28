import { Helmet } from "react-helmet-async";

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
}

export function Metadata({
  title = "Akshay Gore | Full Stack Developer",
  description = "Full Stack Developer passionate about building scalable applications and contributing to open source. Love to build and contribute.",
  path = "/",
}: MetadataProps) {
  const url = `https://akshaygore.dev${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />

      {/* Additional SEO */}
      <meta name="author" content="Akshay Gore" />
      <meta
        name="keywords"
        content="Akshay Gore, Full Stack Developer, Web Development, Open Source, React, TypeScript"
      />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
