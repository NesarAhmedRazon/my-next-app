import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const wpUrl = process.env.WP_URL;

  const count = parseInt(searchParams.get("count")) ?? 10;
  const from = searchParams.get("from") ?? "";
  const category = searchParams.get("cat") ?? "";

  const variables = { after: from, first: count, category: category };
  const query = `
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

  const res = await fetch(wpUrl, {
    method: "POST",
    body: JSON.stringify({
      query: query,
      variables
    }),
    headers: {
      "Content-Type": "application/json",
      "CF-Access-Client-Id": process.env.CF_CLIENT_ID,
      "CF-Access-Client-Secret": process.env.CF_CLIENT_SECRET
    },
    credentials: "include",
    cache: "no-cache"
  });

  const { data } = await res.json();
  return NextResponse.json(data);
}
