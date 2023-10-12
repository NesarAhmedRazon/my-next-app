export default function CtaRow(props) {
  const { data } = props;

  const ctaCols = data?.column ?? [];
  const ctaRowColCount = data?.columns_count ?? 2;

  let craColsClass = "twelve";
  switch (ctaRowColCount) {
    case 2:
      craColsClass = "six";
      break;
    case 3:
      craColsClass = "four";
      break;
    default:
      craColsClass = "twelve";
  }

  const bgcolor = data?.background_color ? data?.background_color : "#3FB65B";
  const style = {
    ...(bgcolor && { backgroundColor: bgcolor })
  };

  return (
    <div style={style} className={`row`} id="CtaRow">
      <div className={`column twelve`}>
        <div className={`row siteWidth`}>
          {ctaCols.map((col, i) => {
            return (
              <div
                className={`column ${craColsClass}`}
                key={i}
                dangerouslySetInnerHTML={{ __html: col?.content }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
