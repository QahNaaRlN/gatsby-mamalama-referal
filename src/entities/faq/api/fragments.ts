import { graphql } from 'gatsby';

export const faqFields = graphql`
  fragment FAQFields on Strapi_Faq {
    documentId
    question
    answer
    isExpanded
    faq {
      id
    }
    site {
      domain
      siteName
    }
  }
`;
