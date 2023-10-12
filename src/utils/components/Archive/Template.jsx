import Pagination from "@components/Pagination";
import TypePost from "./TypePost";
import TypeVideo from "./TypeVideo";

export default function ArchiveTemplate(props) {
  const { posts, layout, info, pageId } = props;
  const totalPost = info?.total ?? 0;
  const perPage = info?.perPage ?? 10;
  console.log(info);
  const style = props?.style ?? "";
  return (
    <div className="row">
      <div className="column twelve">
        <div className={`childList archive ${layout} ${style}`}>
          {posts && posts.length > 0
            ? posts.map((post, i) => {
                const video = post?.videoLink?.videoLink ?? null;
                return typeof video === "string" ? (
                  <TypeVideo
                    post={post}
                    key={`${post.id}_v_${i}`}
                    layout={layout}
                    style={style}
                  />
                ) : (
                  <TypePost
                    post={post}
                    key={`${post.id}_${i}`}
                    layout={layout}
                    style={style}
                  />
                );
              })
            : ""}
        </div>
        {totalPost && (
          <div className={`containerSized section py-4 `}>
            <Pagination
              totalPost={totalPost}
              currentPage={pageId}
              hasPrevious={true}
              hasMore={true}
              offset={perPage}
              slug={"blog"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

ArchiveTemplate.defaultProps = {
  layout: "gridLayout"
};
