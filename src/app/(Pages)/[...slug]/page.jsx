import PageTemplate from "@components/Body/PageTemplate";
import PostTemplate from "@components/Body/PostTemplate";
import TemplatePartNotFound from "@components/Body/TemplatePartNotFound";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { FetchAll } from "@queries/archive/FetchAll";
import { FetchSingle } from "@queries/single/FetchSingle";
import { GlobalStyle } from "@tools/ThemeOptions";

export const runtime = "edge"; // 'nodejs' (default) | 'edge'
export async function generateStaticParams() {
  const pages = await FetchAll("pages", 2);
  const posts = await FetchAll("posts", 2);
  const list = [...pages?.nodes, ...posts?.nodes].map((item) => {
    let uri = item.uri;
    uri = uri.replace(/^\/|\/$/g, ""); // remove leading and trailing slash
    return { slug: uri.split("/") };
  });
  return [list];
}

export default async function SinglePage({ params }) {
  const { slug } = params; // slug is an array of strings
  const pageData = await FetchSingle(slug.join("/")); // join the array into a string with "/" as separator and fetch the data
  const { nodeByUri, tfOption, menus } = pageData?.data; // destructure the data

  // If error return error message
  if (pageData?.err !== null) {
    return <TemplatePartNotFound />; // if there is an error, return the TemplatePartNotFound component
  }

  const data = nodeByUri ?? []; // if nodeByUri is undefined, set data to an empty array
  const template = data?.template?.__typename; // get the template name
  const footer = tfOption?.footer; // get the footer data
  const type = data?.__typename?.toLowerCase(); // get the type of the page
  const fScript = tfOption?.codes?.footer?.js;
  return (
    <>
      <GlobalStyle option={tfOption} /> {/* set the global style */}
      {template === "Template_BlankSlate" ? "" : <Header menus={menus} />}{" "}
      {/* if the template is Template_BlankSlate, return nothing, else return the Header component */}
      {!nodeByUri ? (
        <TemplatePartNotFound /> // if nodeByUri is undefined, return the TemplatePartNotFound component
      ) : (
        <main
          className={`bodyContainer site-body single type-${
            typeof data?.__typename !== "undefined" &&
            data.__typename.toLowerCase()
          }`}
        >
          {type === "post" && <PostTemplate data={data} />}{" "}
          {/* if the type is post, return the PostTemplate component */}
          {type === "page" && <PageTemplate data={data} />}{" "}
          {/* if the type is page, return the PageTemplate component */}
        </main>
      )}
      {template === "Template_BlankSlate" ? (
        ""
      ) : (
        <Footer option={footer} script={fScript} />
      )}{" "}
      {/* if the template is Template_BlankSlate, return nothing, else return the Footer component */}
    </>
  );
}

// Metadata
export async function generateMetadata({ params }) {
  const api = process.env.NEXT_PUBLIC_API_URI;
  const { slug } = params ?? {};

  const pageData = await fetch(`${api}/single/${slug?.join("/")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });

  const data = pageData?.data?.nodeByUri || [];

  return {
    title: data?.seo?.title || "Tallyfy LLC",
    description: data?.seo?.metaDesc || "Tallyfy LLC",
    keywords: data?.seo?.focuskw || "Tallyfy LLC",
    locale: "en_US",
    type: "website",
    siteName: "Tallyfy LLC"
  };
}
