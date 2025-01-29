import { graphql } from "gatsby";

export const faqFields = graphql`
  fragment FAQFields on Strapi_FaqContent {
    documentId
    question
    answer
    isExpanded
    site {
      domain
      siteName
  }
  }
`;
