import ArchiveTemplate from "@components/Archive/Template";
import TemplatePartLegal from "@components/Body/TemplatePartLegal";
import HtmlParser from "@tools/HtmlParser";

export default function PageTemplate({ data }) {
  const heading = data?.allCmbMeta?.heading ?? 1;
  const topPadding = data?.allCmbMeta?.padding?.top;
  const bottomPadding = data?.allCmbMeta?.padding?.bottom;
  const type = data?.__typename?.toLowerCase() ?? "page";
  const template = data?.template?.__typename;
  const hasChild = data?.children?.nodes?.length > 0;
  const postList = data?.children?.nodes ?? [];
  const isArchive = data?.likeArchive?.isArchive ?? false;

  return (
    <>
      {heading !== 1 && (
        <div className="entry-header bg-tfnormal text-white">
          <div className="row content">
            <div className="column twelve">
              <h1 className="entry-title">{data?.title}</h1>
            </div>
          </div>
        </div>
      )}
      <div
        className={`site-content${topPadding === 1 ? " pt-0" : ""}${
          bottomPadding === 1 ? " pb-0" : ""
        }`}
      >
        {template === "Template_LeftsidebarForLegalPages" ? (
          <TemplatePartLegal data={data.content} />
        ) : template === "Template_FullwidthPageNoSidebarButSLIM" ? (
          <article
            id={`post-${data?.databaseId ?? 0}`}
            className={`type-${type.toLowerCase()}`}
          >
            <div className="row">
              <div className="column one"></div>
              <div className="column ten">
                {data?.content && <HtmlParser string={data?.content} />}
              </div>
              <div className="column one"></div>
            </div>
          </article>
        ) : (
          <article
            id={`post-${data?.databaseId ?? 0}`}
            className={`type-${type}`}
          >
            {data?.content && <HtmlParser string={data?.content} />}
            {/*If page is archive*/}
            {hasChild && isArchive === "yes" && (
              <ArchiveTemplate
                posts={postList}
                layout="gridLayout"
                style="slim"
              />
            )}
          </article>
        )}
      </div>
    </>
  );
}
