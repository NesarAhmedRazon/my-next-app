import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = params;
  const { searchParams } = new URL(request.url);
  const wpUrl = process.env.WP_URL;
  const count = parseInt(searchParams.get("count")) || 10;
  const from = searchParams.get("from") || "";
  const category = searchParams.get("cat") || "";

  const query = `
        query GetPosts($after: String = "", $first: Int = ${count}) {
        ${slug}(first: $first, after: $after) {
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
    next: { revalidate: 1 }
  });

  const { data } = await res.json();
  return NextResponse.json(data);
}
