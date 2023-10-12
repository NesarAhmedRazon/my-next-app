export async function FetchAll(
  type = "posts",
  count = 10,
  from = "",
  category = ""
) {
  const wpUrl = process.env.WP_URL;

  const query = `
        query GetPosts($after: String = "", $first: Int = 99) {
        ${type}(first: $first, after: $after) {
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
  const res = await fetch(wpUrl, {
    method: "POST",
    body: JSON.stringify({
      query: query,
      variables: { after: from, first: count, category: category }
    }),
    headers: {
      "Content-Type": "application/json",
      "CF-Access-Client-Id": process.env.CF_CLIENT_ID,
      "CF-Access-Client-Secret": process.env.CF_CLIENT_SECRET
    },
    credentials: "include",
    next: { revalidate: 0 }
  });
  const { data } = await res.json();

  return data?.[type] || [];
}
