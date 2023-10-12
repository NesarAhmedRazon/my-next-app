import CtaArea from "@components/CtaArea";
import PostMeta from "@components/PostMeta";
import RelatedLinks from "@components/RelatedLinks";
import HtmlParser from "@tools/HtmlParser";
import ThemeOptions from "@tools/ThemeOptions";

export default function PostTemplate(props) {
  const { data } = props;
  const type = data?.__typename?.toLowerCase() ?? "post";
  const heading = data?.allCmbMeta?.heading ?? 1;
  const related = data?.customRelatedPosts;
  const cats = data?.categories?.nodes.map((cat) => {
    return {
      name: cat?.name ?? "",
      uri: `blog${cat?.uri}` ?? "",
      slug: cat?.slug ?? ""
    };
  });
  const postMeta = {
    author: data?.author?.node ?? [],
    meatadata: {
      date: data?.date,
      category: cats?.[0]
    }
  };

  return (
    <>
      {props?.themeOption && (
        <ThemeOptions data={props?.themeOption} option={["post", "post"]} />
      )}
      <div className="entry-header ">
        <div className="row content">
          <div className="column twelve">
            <h1 className="entry-title post-title text-center">
              {data?.title}
            </h1>
            {/* TODO: Add the author with New Design
                  {cats[0]?.slug !== "tallyfy-case-studies" && (
                    <TheAuthor author={single?.author} cats={cats[0]} />
                  )} */}
            <PostMeta postMeta={postMeta} />
          </div>
        </div>
      </div>
      <div className={`row site-content`}>
        <div className="column twelve">
          <article
            id={`post-${data?.databaseId}`}
            className={`${heading === "yes" ? "getBorder " : ""}type-${type}`}
          >
            {data?.content && <HtmlParser string={data?.content} />}
            {related && <RelatedLinks data={related} />}
            <CtaArea
              ctaTitle="Ignite static procedures and flowcharts into real-time workflows
            between people"
              ctaImage="https://web-cms.tallyfy.com/wp-content/uploads/3-track-simplified-transparent-final.png"
            />
          </article>
        </div>
      </div>
    </>
  );
}
