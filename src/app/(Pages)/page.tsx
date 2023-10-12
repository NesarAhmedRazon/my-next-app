import PageTemplate from "@components/Body/PageTemplate";
import PostTemplate from "@components/Body/PostTemplate";
import TemplatePartNotFound from "@components/Body/TemplatePartNotFound";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { FetchSingle } from "@queries/single/FetchSingle";
import { GlobalStyle } from "@tools/ThemeOptions";

export default async function HomePage() {
  const pageData = await FetchSingle("/");

  const { nodeByUri, tfOption, menus } = pageData?.data;

  // If error return error message
  if (pageData?.err !== null) {
    return (
      <main className={`bodyContainer site-body single type-page`}>
        {pageData?.err?.message}
      </main>
    );
  }

  const data = nodeByUri ?? [];
  const template = data?.template?.__typename;
  const footer = tfOption?.footer;
  const type = data?.__typename?.toLowerCase();
  const fScript = tfOption?.codes?.footer?.js;

  return (
    <>
      <GlobalStyle option={tfOption} />
      {template === "Template_BlankSlate" ? "" : <Header menus={menus} />}

      {!nodeByUri ? (
        <TemplatePartNotFound />
      ) : (
        <main
          className={`bodyContainer site-body single type-${
            typeof data?.__typename !== "undefined" &&
            data.__typename.toLowerCase()
          }`}
        >
          {type === "post" && <PostTemplate data={data} />}
          {type === "page" && <PageTemplate data={data} />}
        </main>
      )}

      {template === "Template_BlankSlate" ? (
        ""
      ) : (
        <Footer option={footer} script={fScript} />
      )}
    </>
  );
}

// Metadata
export async function generateMetadata() {
  const pageData = await FetchSingle("/");

  const { nodeByUri } = pageData?.data;
  const data = nodeByUri || [];

  return {
    title: data?.seo?.title || "Tallyfy LLC",
    description: data?.seo?.metaDesc || "Tallyfy LLC",
    keywords: data?.seo?.focuskw || "Tallyfy LLC",
    locale: "en_US",
    type: "website",
    siteName: "Tallyfy LLC"
  };
}
