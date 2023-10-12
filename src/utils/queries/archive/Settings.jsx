export const archiveSettings = `query GetArchiveSettings {
    allSettings {
      readingSettingsPageForPosts
      readingSettingsPostsPerPage
      readingSettingsPageForPosts
    }
    posts {
      pageInfo {
        total
      }
    }
  }`;
