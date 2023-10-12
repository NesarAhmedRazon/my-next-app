import Image from "next/image";
import Link from "next/link";

export default function TypeVideo(props) {
  const { post, style } = props;
  let type =
    typeof post.videoLink.__typename == "string"
      ? style[`post${post.videoLink.__typename.replace("Page", "")}`]
      : "";
  const video = post.videoLink.videoLink;

  return (
    <div className={`${style.post} ${type}`} key={post.id}>
      <div className={style.content}>
        <div className={style.post_Head}>
          <Link
            href={post?.author?.node?.uri}
            title={`Post By ${post?.author?.node?.name}`}
            className={style.post_Author}
          >
            <Image
              className={style.post_Author_avater}
              src={post?.author?.node?.avatar?.url}
              alt={`Avatar of ${post?.author?.node?.name}`}
              height={40}
              width={40}
              unoptimized={true}
            />
          </Link>
          <div className={style.post_Terms}>
            {post?.categories?.nodes.map((term, i) => {
              let termName = term.name;
              if (post?.categories?.nodes.length > 1) {
                termName = `${term.name},`;
              }
              return (
                <Link
                  key={i}
                  href={term.uri}
                  title={term.name}
                  className={style.post_Terms_Item}
                >
                  {termName}
                </Link>
              );
            })}
          </div>
        </div>
        <h3 className={style.post_Title}>
          <Link href={post?.uri}>{post?.title}</Link>
        </h3>
      </div>
      <Link
        href="/"
        className={style.thumbnail}
        style={{
          backgroundImage: `url(https://i.ytimg.com/vi/${video}/sddefault.jpg)`
        }}
      >
        <i className={`fa fa-play ${style.playIcon}`} aria-hidden="true"></i>
      </Link>
    </div>
  );
}
