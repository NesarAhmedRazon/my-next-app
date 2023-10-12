import { menus } from "@queries/fragments/MenuNodes";
import {
  authorData,
  categories,
  comments,
  common,
  seo
} from "@queries/fragments/PostNode";
import { themeOptions } from "@queries/fragments/ThemOptions";

export const nodeByUri = `
    query NodeByUri($uri: String = "/") {
        nodeByUri(uri: $uri) {
            id
            uri
             __typename
            ... on Page {
                ${common}
                likeArchive {
                    isArchive
                }
                videoLink {
                    videoLink
                }         
                ${seo}
                children(first: 100) {
                    nodes{
                        ... on Page {
                            id
                            uri
                            title(format: RENDERED) 
                            videoLink {
                                videoLink
                            } 
                            ${authorData}                           
                        }
                    }
                }
            }
            ... on Post {
                ${common}
                ${authorData}
                ${categories}
                ${comments}
                ${seo}
            }
            
        }
        allSettings {
            readingSettingsPageForPosts
        }
        ${themeOptions}
        ${menus}
    }
`;
