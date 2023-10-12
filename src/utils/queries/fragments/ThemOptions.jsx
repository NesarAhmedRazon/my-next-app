const responsives = `
  sm
  md
  lg
  xl
`;

const typo_styles = `
        font_color
        font_size{
          ${responsives}
        }
        font_weight{
          ${responsives}
        }
        line_height{
          ${responsives}
        }
        letter_spacing{
          ${responsives}
        }
        margin_top{
          ${responsives}
        }
        margin_bottom{
          ${responsives}
        }
`;
const padding = `
  padding {
    left {
      ${responsives}
    }
    right {
      ${responsives}
    }
    top{
      ${responsives}
    }
    bottom{
      ${responsives}
    }
  }
`;
export const themeOptions = `
tfOption {
  codes{
    footer{
      js
    }
  }
    layout {
      siteWidth
    }
    post {
      ${padding}
    }
    typography{
      field_id
      ${typo_styles}
    }
    footer { 
      widgets {
        columns_count
        column {
          id
          title
          content
        }
      }     
      copyright {
        columns_count
        column {
          content
          id
        }
      }
      ctaRow {
        columns_count
        background_color
        column {
          content
          id
        }
      }
    }
    
  }`;
