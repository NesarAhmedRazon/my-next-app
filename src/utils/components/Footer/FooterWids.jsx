export default function FooterWids(props) {
  const { data } = props;

  const ctaCols = data?.column ?? [];
  const ctaRowColCount = data?.columns_count ?? 2;

  let colClass = "twelve";
  switch (ctaRowColCount) {
    case 2:
      colClass = "six";
      break;
    case 3:
      colClass = "four";
      break;
    default:
      colClass = "twelve";
  }

  return (
    <div className={`row siteWidth footer_widgets`} id="WidgetsArea">
      <div className={`column twelve`}>
        <div className={`row`}>
          {ctaCols.map((col, i) => {
            return (
              <div className={`column ${colClass} listWidget`} key={i}>
                <h4 className="widHeading">{col?.title}</h4>
                <div
                  className="widContent"
                  dangerouslySetInnerHTML={{ __html: col.content }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
