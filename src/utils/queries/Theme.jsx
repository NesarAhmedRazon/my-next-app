export const GET_THEME_DATA = `
query GetThemeAndOthers{     
  themeOptions {    
    headingStyles {
      font_size
    }
    footer {
      bottom {
        left
        right
      }
      cta
      widgets {
        id
        content
        title
      }
    }
  }
}
`;
