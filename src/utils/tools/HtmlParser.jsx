import HTMLReactParser, { domToReact } from "html-react-parser";
import Image from "next/image";
import Script from "next/script";

export default function HtmlParser({ string, br }) {
  const modify = (node) => {
    if (
      node.name === "h1" ||
      node.name === "h2" ||
      node.name === "h3" ||
      node.name === "h4" ||
      node.name === "h5" ||
      node.name === "h6"
    ) {
      delete node.attribs.style;
    }

    return domToReact(node);
  };

  const options = {
    modify: [modify],
    trim: true,
    replace: (el) => {
      const { attribs } = el;
      const classes = attribs?.class ? attribs?.class.split(" ") : [];

      // Script tag
      if (el.name === "script" && el.attribs?.src) {
        if (el?.attribs?.src) {
          const src = el?.attribs?.src ?? "";
          return (
            <Script
              id={`${uniqueID()}`}
              strategy="lazyOnload"
              src={src}
            ></Script>
          );
        } else {
          return (
            <Script
              id={`${uniqueID()}`}
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `${el.children}`
              }}
            ></Script>
          );
        }
      }
      // Spacer Div
      if (classes.includes("spacer")) {
        const styleTag = el.children[0]?.children[0].data;
        return (
          <>
            <style>{styleTag}</style>
            <div className={attribs?.class} id={el?.attribs?.id} />
          </>
        );
      }

      // TOC Div component
      if (classes.includes("toc_title")) {
        return (
          <div className={attribs?.class}>
            {domToReact(children, WpOpts)}{" "}
            <button
              className="toc_toggle"
              ref={toc_toggle_ref}
              onClick={() => setToc((prev) => !prev)}
            >
              {toc ? " [hide]" : " [show]"}
            </button>
          </div>
        );
      }

      // remove BR tag
      if (el.name === "br" && !br) {
        if (typeof attribs !== "undefined") {
          if (typeof attribs.class !== "undefined") {
            const parClass = el.parent?.attribs?.class.split(" ");
            return parClass?.includes("address");
          }
        }
        return <></>;
      }
      //Remove pt-cv-wrapper
      if (classes.includes("pt-cv-wrapper")) {
        return <></>;
      }
      //Remove Empty P Tags
      if (
        el.name === "p" &&
        ((el?.children.length === 1 &&
          (el?.children[0]?.data === " " ||
            el?.children[0]?.data === " " ||
            (el?.children[0]?.data?.type === "tag" &&
              el?.children[0]?.data.name === "br"))) ||
          el?.children.length === 0)
      ) {
        return <></>; // returning null removes the node from the tree
      }

      //Image With caption Remove Style attribute
      if (classes.includes("wp-caption")) {
        return (
          <div id={attribs.id} className={attribs.class}>
            {domToReact(children, WpOpts)}
          </div>
        );
      }

      // Row Div
      if (classes.includes("row")) {
        const parClass = el.parent?.attribs?.class.split(" ") ?? [];
        if (
          (parClass.includes("outofthebox") &&
            !parClass.includes("tallyfy-wave")) ||
          el?.parent === null
        ) {
          return (
            <div className="row siteWidth">
              {domToReact(el.children, options)}
            </div>
          );
        }
        return <div className="row">{domToReact(el.children, options)}</div>;
      }

      // img tag to next/image
      if (el.name === "img") {
        const alt = el.attribs?.alt ?? "";
        let src = el.attribs?.src ?? "";
        let width = el.attribs?.width ?? 10;
        let height = el.attribs?.height ?? 0;
        const sizes = el.attribs?.sizes ?? "";
        const style = el.attribs?.style ?? "";
        let className = el.attribs?.class ?? "";
        const id = el.attribs?.id ?? "";

        // //if width has % remove it
        // if (width !== 0 && width.includes("%")) {
        //   width = width.replace("%", "");
        // }
        // // height has % remove it
        // if (height !== 0 && height.includes("%")) {
        //   height = height.replace("%", "");
        // }

        // if classes includes 'alignright' or 'alignleft' or 'aligncenter' or 'alignnone' remove width and height from style
        let styles = {
          width: "auto",
          height: "auto"
        };
        if (
          className.includes("alignright") ||
          className.includes("alignleft")
        ) {
          styles = {};
        }
        if (className === "") {
          className = "mx_auto";
        }
        return (
          <Image
            id={id}
            alt={alt}
            loading="lazy"
            className={className}
            src={
              src.startsWith("//") && !src.startsWith("https://")
                ? "https:" + src
                : src
            }
            width={parseInt(width)}
            height={parseInt(height)}
            sizes="100vw"
            quality={75}
            style={styles} // optional
          />
        );
      }
    }
  };

  const parsedContent = HTMLReactParser(string, options);
  return <>{parsedContent}</>;
}

const uniqueID = () => {
  return Math.floor(Math.random() * Date.now());
};
