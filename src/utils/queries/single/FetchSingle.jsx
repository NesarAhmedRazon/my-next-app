// Fetch Post From WPgraphql using slug

import { nodeByUri } from "./ByUri";

export async function FetchSingle(slug = "/") {
  let err = null;
  const wpUrl = process.env.WP_URL;
  const res = await fetch(wpUrl, {
    method: "POST",
    body: JSON.stringify({
      query: nodeByUri,
      variables: { uri: slug }
    }),
    headers: {
      "Content-Type": "application/json",
      "CF-Access-Client-Id": process.env.CF_CLIENT_ID,
      "CF-Access-Client-Secret": process.env.CF_CLIENT_SECRET
    },
    credentials: "include",
    next: { revalidate: 1 }
  });

  const { data, error } = await res.json();
  if (error) {
    err = error;
  }
  return { data, err };
}
