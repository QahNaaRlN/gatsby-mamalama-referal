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
    }
  }
`;