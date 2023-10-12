import { menus } from "@fragments/MenuNodes";
import { themeOptions } from "@fragments/ThemOptions";
export const get_blogs = `
query GetPosts($offset: Int = 10, $size: Int = 10, $after: String = "") {
  posts(where: {offsetPagination: {offset: $offset, size: $size}}
  after: $after
  first: $size) {
    nodes {
      id
      uri
      date
      title(format: RENDERED)
      excerpt
      author {
        node {
          id
          uri
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          id
          name
          uri
        }
      }
      
    }
    pageInfo {
        offsetPagination {
          hasMore
          hasPrevious
          total
        }
        hasNextPage
        hasPreviousPage
        total
        endCursor
        startCursor
      }
  }
   ${menus}
   ${themeOptions} 
}
`;
