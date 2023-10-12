import { gql } from "@apollo/client";
import { get_blogs } from "@queries/archive/GetPosts";
import { archiveSettings } from "@queries/archive/Settings";
import { nodeById } from "@queries/single/ById";
import client from "@tools/ApolloClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const page = 1;

  // Get settings For Archive Page
  const settings = await client.query({
    query: gql`
      ${archiveSettings}
    `
  });
  const perPage =
    settings?.data?.allSettings?.readingSettingsPostsPerPage ?? 10;
  const blogPageID = settings?.data?.allSettings?.readingSettingsPageForPosts;

  const archive = await client.query({
    query: gql`
      ${get_blogs}
    `,
    variables: {
      offset: page * perPage,
      size: perPage,
      after: "",
      first: perPage
    }
  });

  const single = await client.query({
    query: gql`
      ${nodeById}
    `,
    variables: { id: blogPageID }
  });

  const data = { ...archive?.data, ...single?.data, perPage };
  if (!data) {
    return NextResponse.error(new Error("Not found"));
  }
  return NextResponse.json(data);
}
