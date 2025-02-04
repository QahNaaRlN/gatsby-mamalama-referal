/**
 * @fileoverview Этот файл содержит фрагмент GraphQL для сущности Strapi_ConditionContent.
 * Он определяет поля, которые будут использоваться в запросах GraphQL.
 */
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