export const menuNodeL3 = `

  nodes {
    id
      uri
      path
      label
      title
      target
      cssClasses
      description      
  }

`;
export const menuNodeL2 = `

  nodes {
    id
      uri
      path
      label
      title
      target
      cssClasses
      description
      childItems(where: {parentId: "2"}) {
        ${menuNodeL3}
      }
  }

`;
export const menuNodeL1 = `
  nodes {
    id
      uri
      path
      label
      title
      target
      cssClasses
      description
      childItems(where: {parentId: "1"}) {
        ${menuNodeL2}
      }
  }
`;

export const menus = `
  menus(first: 10) {      
      nodes {
        id
        name
        slug
        menuItems(where: { parentId: "0" }) {
          ${menuNodeL1}
        }
      }
    }    
  `;
