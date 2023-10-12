import { GET_THEME_DATA } from "@queries/Theme";
import { NextResponse } from "next/server";

export async function GET() {
  const wp_url = process.env.WP_URL;
  const query = GET_THEME_DATA;
  const res = await fetch(wp_url, {
    method: "POST",
    body: JSON.stringify({
      query: query
    }),
    headers: {
      "Content-Type": "application/json",
      "CF-Access-Client-Id": process.env.CF_CLIENT_ID,
      "CF-Access-Client-Secret": process.env.CF_CLIENT_SECRET
    },
    credentials: "include",
    next: {
      revalidate: 1
    }
  });
  const { data } = await res.json();

  return NextResponse.json(data);
}
