import { graphql } from 'gatsby';

export const conditionFields = graphql`
  fragment ConditionFields on Strapi_Condition {
    documentId
    title
    description
    isActive
  }
`;