import HtmlParser from "@tools/HtmlParser";

export default function TemplatePartLegal({ data }) {
  return (
    <div className="row siteWidth">
      <div className="column three"></div>
      <div className="column nine">
        <HtmlParser string={data} />
      </div>
    </div>
  );
}
