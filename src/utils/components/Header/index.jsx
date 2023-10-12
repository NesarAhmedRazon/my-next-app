"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { decodeHTML, decodeXML } from "speedy-entities";
import MobileNav from "./MobileNav";

export default function Header(props) {
  const { menus } = props;
  const [borderColor, setBorderColor] = useState(false);
  useEffect(() => {
    const changeBorder = () => {
      if (window.scrollY >= 73) {
        setBorderColor(true);
      } else {
        setBorderColor(false);
      }
    };
    window.addEventListener("scroll", changeBorder);
  }, []);

  let mobnavItems = [];
  let primaryNavItems = [];

  menus !== null &&
    menus?.nodes.map((menu) => {
      if (menu?.slug === "mobile-menu") {
        mobnavItems = menu?.menuItems?.nodes;
      }
      if (menu?.slug === "header-primary-navigation") {
        primaryNavItems = menu?.menuItems?.nodes;
      }
    });

  return (
    <header className={`header ${borderColor ? ` sticky` : ""}`}>
      <div className={`row siteWidth`}>
        <div className="column twelve site-menu-bar">
          <Link className="logo" aria-label="Tallyfy Home page" href="/">
            <Image
              alt="Tallyfy logo"
              className="logo_icon"
              width={100}
              height={100}
              src="/images/Tallyfy_logo.svg"
              priority={true}
            />
          </Link>
          <ul className="desktopNav">{NeavItems(primaryNavItems)}</ul>
          <MobileNav data={mobnavItems} />
        </div>
      </div>
    </header>
  );
}

const NeavItems = (item) => {
  let uri = "/";

  return item?.map((node, i) => {
    let wpclass = "navitem";
    if (typeof node?.path === "string") {
      uri = node?.path;
    }
    if (node?.cssClasses.length > 0) {
      wpclass = wpclass + " " + node?.cssClasses.join(" ");
    }
    let nLabel = node?.label.replace(/(<([^>]+)>)|\xA0/gi, "").trim();
    let nTitle = node?.title ?? "";
    return (
      <li
        key={node?.id}
        className={`navLi ${
          node?.childItems?.nodes?.length > 0 ? "hasChild" : ""
        }`}
      >
        <Link
          href={uri}
          title={decodeHTML(decodeXML(nTitle))}
          aria-label={nLabel}
          className={wpclass}
        >
          {nLabel}
          {node?.childItems?.nodes?.length > 0 ? (
            <FaCaretDown className="icon" />
          ) : null}
        </Link>
        {node?.childItems?.nodes?.length > 0 ? (
          <>
            <ul className="subNav">{NeavItems(node?.childItems?.nodes)}</ul>
          </>
        ) : null}
      </li>
    );
  });
};
