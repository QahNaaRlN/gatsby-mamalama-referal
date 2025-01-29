import { graphql } from "gatsby";

export const conditionFields = graphql`
  fragment ConditionFields on Strapi_ConditionContent {
    documentId
    title
    description
    isActive
    condition {
      documentId
    }
    site {
      domain
      siteName
    }
  }
`;