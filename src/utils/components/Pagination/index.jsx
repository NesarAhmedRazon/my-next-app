import Link from "next/link";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight
} from "react-icons/bs";
import style from "./pagination.module.scss";

export default function Pagination(props) {
  const { currentPage, slug } = props;
  const current = parseInt(currentPage);
  const totalPage = Math.ceil(props.totalPost / props.offset) - 1;

  if (totalPage === 1) return null;

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const getLink = () => {
    let links = [];

    if (totalPage > 5) {
      if (current - 2 >= 0) {
        if (totalPage - current < 2) {
          for (
            let i = current - (4 - (totalPage - current));
            i <= current - 1;
            i++
          ) {
            links.push({ text: i, ind: i, title: `Page ${i}` });
          }
        } else {
          for (let i = current - 2; i <= current - 1; i++) {
            if (i != 0) {
              links.push({ text: i, ind: i, title: `Page ${i}` });
            }
          }
        }
      }
      links.push({ text: current, ind: current, title: `Page ${current}` });

      if (totalPage - current >= 2) {
        for (let i = current + 1; i <= current + 2; i++) {
          links.push({ text: i, ind: i, title: `Page ${i}` });
        }
      } else {
        for (let i = current + 1; i <= totalPage; i++) {
          links.push({ text: i, ind: i, title: `Page ${i}` });
        }
      }

      let last = links[links.length - 1];
      if (links.length < 5) {
        for (let i = links.length + 1; i <= 5; i++) {
          if (last.ind + 1 <= totalPage) {
            links.push({ text: i, ind: i, title: `Page ${i}` });
          }
        }
      }
      if (links[0].ind < current) {
        links = [
          { text: <BsChevronLeft />, ind: current - 1, title: "Previous Page" },
          ...links
        ];
        if (current > 5) {
          links = [
            {
              text: <BsChevronDoubleLeft />,
              ind: current - 5,
              title: "Go to 5 Previous Pages"
            },
            ...links
          ];
        } else {
          links = [
            { text: <BsChevronDoubleLeft />, ind: 1, title: "First Page" },
            ...links
          ];
        }
      }
      if (last.ind > current) {
        links.push({
          text: <BsChevronRight />,
          ind: current + 1,
          title: "Next Page"
        });
        if (totalPage - current > 5) {
          links.push({
            text: <BsChevronDoubleRight />,
            ind: current + 5,
            title: "Go to 5 Next Pages"
          });
        } else {
          links.push({
            text: <BsChevronDoubleRight />,
            ind: totalPage,
            title: "Last Page"
          });
        }
      }
    } else {
      for (let i = 1; i <= totalPage; i++) {
        links.push({ text: i, ind: i });
      }
    }
    return links;
  };
  return (
    <div className={style.pagination}>
      {getLink().map((page, i) => {
        return (
          <Link
            href={page.ind == 1 ? `/${slug}` : `/${slug}/page/${page.ind}`}
            key={i}
            title={page.title}
            className={`${style.item}${
              current == page.ind ? ` ${style["current"]}` : ""
            }`}
          >
            {page.text}
          </Link>
        );
      })}
    </div>
  );
}

Pagination.defaultProps = {
  totalPost: 100,
  offset: 10,
  hasPrevious: true,
  hasMore: true,
  total: 10,
  current: 1,
  slug: "blog"
};
