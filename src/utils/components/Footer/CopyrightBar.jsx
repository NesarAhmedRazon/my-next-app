export default function CopyrightBar(props) {
  const { data } = props;

  const cprCols = data?.column ?? [];
  const cprBarColCount = data?.columns_count ?? 2;
  let cprColsClass = "twelve";
  switch (cprBarColCount) {
    case 2:
      cprColsClass = "six";
      break;
    case 3:
      cprColsClass = "four";
      break;
    default:
      cprColsClass = "twelve";
  }

  return (
    <div className={`row siteWidth footer_copyright_bar`} id="CopyrightBar">
      {cprCols.map((col, i) => {
        return (
          <div
            className={`column ${cprColsClass}`}
            key={i}
            dangerouslySetInnerHTML={{ __html: col?.content }}
          ></div>
        );
      })}
    </div>
  );
}
