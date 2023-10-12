import { menus } from "@fragments/MenuNodes";
import { common, seo } from "@fragments/PostNode";
import { themeOptions } from "@fragments/ThemOptions";

export const nodeById = `
  query SinglePageId($id: ID = "") {
    page(id: $id, idType: DATABASE_ID) {
        id
        ${common}
        isPostsPage
        isFrontPage
        allCmbMeta {
          heading
          padding{
          top
          bottom
        }
      }
      excerpt(format: RENDERED)        
      ${seo}
    }
    ${menus}
  ${themeOptions} 
  }`;
