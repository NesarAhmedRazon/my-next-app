import { TruncateWords } from "@tools/TruncateWords";
import HTMLReactParser from "html-react-parser";

export const RanderedExpart = (props) => {
  const exap = props?.exap ?? "";
  const classes = typeof props.styles !== "undefined" ? ` ${props.styles}` : "";
  const WpOpts = {
    replace: (el) => {
      let string = el.toString();

      if ((el.name === "p" && el.children !== "") || el.name === "br") {
        string = el.children[0].data.toString();
        return (
          <p className={`post_Exap${classes}`}>
            {TruncateWords(string, props.words)}
          </p>
        );
      }
      if (el.type === "text" && el.data !== "") {
        string = el.data.toString();
        return (
          <p className={`post_Exap${classes}`}>
            {TruncateWords(string, props.words)}
          </p>
        );
      }
    }
  };

  return HTMLReactParser(exap.replace(/\n/g, ""), WpOpts);
};
