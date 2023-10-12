import { RanderedExpart } from "@tools/RanderedExpart";
import ThumbNailCanvas from "@tools/ThumbnailCanvas";
import Link from "next/link";

export default function TypePost(props) {
  const { post, layout } = props;
  const exap = post?.excerpt ?? false;
  const style = props?.style ?? "";

  let type = post?.__typename ? ` ${post?.__typename.toLowerCase()}` : ``;

  return (
    <div className={`post ${type}`} key={post.id}>
      {!style == "slim" && (
        <div className={`post_Head`} key={post.id}>
          <Link
            href={post?.author?.node?.uri ?? post?.author?.node?.url ?? "/"}
            title={`Post By ${post?.author?.node?.name}`}
            className={`post_Author author_avatar`}
          >
            <ThumbNailCanvas
              src={post?.author?.node?.avatar?.url}
              alt={`Profile Photo of ${post?.author?.node?.name}`}
              aspect="1/1"
            />
          </Link>
          <div className={`post_Terms`}>
            <div className={`post_Terms_author`}>
              by {post?.author?.node?.name}
            </div>
            {post?.categories?.nodes.map((term, i) => {
              let termName = term.name;
              if (post?.categories?.nodes.length > 1) {
                termName = `${term.name},`;
              }
              return (
                <Link
                  key={i}
                  href={type === "post" ? term.uri : `/blog${term.uri}`}
                  title={term.name}
                  className={`post_Terms_Item`}
                >
                  {termName}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <Link
        className={`post_Title`}
        href={post?.uri ?? "/"}
        title={post?.title}
        aria-label={`link to ${post?.title}`}
      >
        {post?.title}
      </Link>

      {exap && !style == "slim" && <RanderedExpart exap={exap} words={35} />}
      {!style == "slim" && (
        <div className={`arkfooter`}>
          <Link
            className={`readMore`}
            href={post?.uri}
            aria-label={`Read more about ${post?.title}`}
            title={`Read more about ${post?.title}`}
          >
            Read This Guide
          </Link>
        </div>
      )}
    </div>
  );
}
