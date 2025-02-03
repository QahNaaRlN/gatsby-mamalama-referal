import { graphql } from "gatsby";

export const regFormPromoFields = graphql`
  fragment RegFormPromoFields on Strapi_RegistrationFormPromoContent {
    documentId
    title
    subtitle
    description
    site {
      domain
      siteName
      discount
    }
  }
`;

export const regFormSuccessFields = graphql`
  fragment RegFormSuccessFields on Strapi_RegistrationFormSuccessContent {
    documentId
    title
    subtitle
    description
    link
    site {
      domain
      siteName
      discount
    }
  }
`;