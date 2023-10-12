import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";

import ThumbNailCanvas from "@tools/ThumbnailCanvas";
import style from "./postMeta.module.scss";

export default function PostMeta({ postMeta }) {
  const postDate =
    new Date(postMeta?.meatadata?.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }) ?? "";

  return (
    <div className={style.container}>
      <div className={style.columnLeft}>
        {/* <AuthorArea style={style} data={postMeta} /> */}
        <div className={`${style.withThumb} ${style.post_Head}`}>
          <Link
            href={postMeta?.author?.uri ?? postMeta?.author?.url ?? "/"}
            title={`Post By ${postMeta?.author?.name}`}
            className={`${style.post_Author} ${style.author_avatar}`}
          >
            <ThumbNailCanvas
              src={postMeta?.author?.avatar?.url}
              alt={`Profile Photo of ${postMeta?.author?.name}`}
              aspect="1/1"
            />
          </Link>
          <div className={style.post_Terms}>
            <div className={style.post_Terms_author}>
              by {postMeta?.author?.name}
            </div>
            {postMeta?.meatadata?.category && (
              <Link
                href={postMeta?.meatadata?.category?.uri}
                title={postMeta?.meatadata?.category?.name}
                className={style.post_Terms_Item}
              >
                {postMeta?.meatadata?.category?.name}
              </Link>
            )}
          </div>
        </div>
        {/* <div className={style.author}>
          By{" "}
          <Link className={style.name} href={postMeta?.author?.uri ?? "/"}>
            {postMeta?.author?.name}{" "}
          </Link>
          in
          <Link
            className={style.category}
            href={postMeta?.meatadata?.category?.uri ?? "/"}
          >{` ${postMeta?.meatadata?.category?.name}`}</Link>
        </div> */}
        {/* <div className={style.metaData}>
          {postDate !== "" && (
            <>
              Published on <span className={style.date}>{postDate}</span>
            </>
          )}
        </div> */}
      </div>
      <div className={`${style.columnCenter} md:hidden`}>
        <Link
          className={`${style.icon} ${style.tallyfy}`}
          target="_blank"
          title="Tallyfy LinkedIn Page"
          href={"https://linkedin.com/company/tallyfy" ?? "/"}
        >
          Discover Tallyfy
        </Link>
      </div>
      <div className={style.columnRight}>
        <div className={style.share}>
          <div className="text-center md:text-right font-semibold text-base md:text-sm">
            Follow Us on
          </div>
          <div className={style.social}>
            <Link
              className={`${style.icon} ${style.tallyfy} hidden md:flex `}
              target="_blank"
              title="Tallyfy "
              href={"https://linkedin.com/company/tallyfy" ?? "/"}
            >
              Discover Tallyfy
            </Link>
            <Link
              className={`${style.icon} ${style.linkedin}`}
              target="_blank"
              title="Tallyfy LinkedIn Page"
              href={"https://linkedin.com/company/tallyfy" ?? "/"}
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

PostMeta.defaultProps = {
  postMeta: {
    meatadata: {
      date: "2021-08-10T14:00:00.000Z",
      category: {
        name: "category",
        uri: "/"
      }
    }
  }
};
