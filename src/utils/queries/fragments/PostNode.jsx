export const common = `
  id
  uri
  slug
  dateGmt
  date
  databaseId
  title(format: RENDERED)
  content(format: RENDERED)  
  template {
    __typename
    templateName
  }
  redirect{
    redirectStatus
    redirectTo
  }
  likeArchive {
    isArchive
  }
  breadcrumbs {
        slug
        title
      }
`;

export const seo = `
  seo {
    title
    metaDesc
    metaRobotsNofollow
    metaRobotsNoindex
    breadcrumbs {
      text
      url
    }
    focuskw
    fullHead
    metaDesc
    schema {
          articleType
          pageType
          raw
        }
  }
`;

export const authorData = `
      author {
          node {
            id
            url
            uri
            name
            avatar {
              url
            }
          }
        }`;

export const categories = `
  categories(first: 10) {
    nodes {
      id
      slug
      uri
      name
      children(first: 5) {
        edges {
          node {
            id
          }
        }
      }
      posts(last: 2) {
        nodes {
          id
          title(format: RENDERED)
          uri
        }
      }
    }
  }
  `;

export const comments = `
commentCount
comments (first:100,where: {orderby: COMMENT_DATE}){
  nodes {
    id
    date
    dateGmt
    databaseId
    content(format: RENDERED)
    author {
                node {
                  id
                  url
                  name
                  avatar {
                    url
                  }
                }
              }
  }
}`;
