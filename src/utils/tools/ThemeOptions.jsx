export default function ThemeOptions({ data = [], option = ["post"] }) {
  const options = data[option[0]];
  const sec = option[1] ?? "";
  let styles = [];

  // create a for loop to iterate through the options
  if (option[0] !== "typography") {
    for (const [field, values] of Object.entries(options)) {
      // Check if the key is an object or not
      if (field !== "__typename") {
        if (typeof values === "object" && values) {
          // If the key is an object, iterate through the object
          for (const [id, val] of Object.entries(values)) {
            // Check if the id is an object or not
            if (id !== "__typename") {
              if (typeof val === "object" && val) {
                styles.push(responsiveStyle(sec + cap(field), cap(id), val));
              } else {
                styles.push(`--${sec}${cap(field)}${cap(id)}: ${val};`);
              }
            }
          }
        } else {
          styles.push(`--${sec}${cap(field)}: ${values};`);
        }
      }
    }
  }

  return (
    <style>
      {`
          :root {
            ${styles.join("")}
          }
        `}
    </style>
  );
}

function responsiveStyle(field_id, name, value, dval = "inherit") {
  const sm = value?.sm ?? dval;
  const md =
    value?.md == "" || value?.md == null || value?.md == undefined
      ? sm
      : value?.md;
  const lg =
    value?.lg == "" || value?.lg == null || value?.md == undefined
      ? md
      : value?.lg;
  const xl =
    value?.xl == "" || value?.xl == null || value?.md == undefined
      ? lg
      : value?.xl;

  return `
    --${field_id}${name}: ${sm};
    --${field_id}${name}-md: ${md};
    --${field_id}${name}-lg: ${lg};
    --${field_id}${name}-xl: ${xl};
  `;
}

function cap(string) {
  return string.replace(/^./, string[0].toUpperCase());
}

export function GlobalStyle({ option }) {
  const siteWidth = option?.layout?.siteWidth ?? "1200px";
  const typography = option?.typography ?? [];
  const typographyVars = typography?.map((item) => {
    return `    
      --${item?.field_id}Color: ${item?.font_color};
      ${responsiveStyle(item?.field_id, "Size", item?.font_size, "16px")}
      ${responsiveStyle(item?.field_id, "Weight", item?.font_weight, 400)}
      ${responsiveStyle(item?.field_id, "LHeight", item?.line_height, 1)}
      ${responsiveStyle(item?.field_id, "LtSpace", item?.letter_spacing, 0)}
      ${responsiveStyle(item?.field_id, "MTop", item?.margin_top, "unset")}
      ${responsiveStyle(
        item?.field_id,
        "MBottom",
        item?.margin_bottom,
        "unset"
      )}
    `;
  });
  return (
    <style>
      {`
          :root {
            ${siteWidth && `--maxSiteWidth: ${siteWidth};`} 
            ${typographyVars.join("")}
            `}
    </style>
  );
}
