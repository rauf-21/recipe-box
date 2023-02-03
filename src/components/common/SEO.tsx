import NextHead from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  openGraph?: {
    url: string;
    type: string;
    title: string;
    description: string;
    image: string;
  };
}

export default function SEO({
  title = "Recipe Box",
  description = "A Food Recipe App",
  openGraph,
}: SEOProps) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <link
        rel="icon"
        href="/favicon.ico"
      />
      {openGraph !== undefined && (
        <>
          <meta
            name="og:url"
            content={openGraph.url}
          />
          <meta
            name="og:type"
            content={openGraph.type}
          />
          <meta
            name="og:title"
            content={openGraph.title}
          />
          <meta
            name="og:description"
            content={openGraph.description}
          />
          <meta
            name="og:image"
            content={openGraph.image}
          />
        </>
      )}
    </NextHead>
  );
}
