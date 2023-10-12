import { ApolloClient, InMemoryCache } from "@apollo/client";

// SETUP YOUR WORDPRESS DOMAIN NAME
const client = new ApolloClient({
  uri: `${process.env.WP_URL}`,
  credentials: "include",
  headers: {
    "CF-Access-Client-Id": process.env.CF_CLIENT_ID,
    "CF-Access-Client-Secret": process.env.CF_CLIENT_SECRET
  },
  cache: new InMemoryCache()
});

export default client;
