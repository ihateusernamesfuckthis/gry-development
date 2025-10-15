// GraphQL queries for fetching archive metaobjects

export const GET_ARCHIVE_METAOBJECTS = `
  query GetArchiveMetaobjects {
    findYourSmile: metaobject(handle: {type: "findyoursmile", handle: "findyoursmile-handle"}) {
      handle
      type
      fields {
        key
        type
        references(first: 50) {
          edges {
            node {
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }

    behindTheScenes: metaobject(handle: {type: "behindthescenes", handle: "behindthescenes-handle"}) {
      handle
      type
      fields {
        key
        type
        references(first: 50) {
          edges {
            node {
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }

    events: metaobject(handle: {type: "events", handle: "events-handle"}) {
      handle
      type
      fields {
        key
        type
        references(first: 50) {
          edges {
            node {
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;