export const GET_POSTS = `
query GetPosts($after: String = "", $first: Int = 99) {
  posts(first: $first, after: $after) {
    nodes {
      id
      uri
      databaseId
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;
