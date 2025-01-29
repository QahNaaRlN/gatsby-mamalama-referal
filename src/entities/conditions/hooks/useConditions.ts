import { useStaticQuery, graphql } from 'gatsby';

import { validateCondition } from "@entities/conditions";
import { ConditionBase } from "@entities/conditions/model";
import { useProcessData } from '@shared/hooks/useProcessData';
import { getCurrentDomain } from '@shared/lib/domain';

interface ConditionContent {
  documentId: string;
  site?: {
    domain: string;
    siteName: string;
  };
}

interface GraphQLResponse {
  strapi: {
    conditionContents: ConditionContent[];
  };
}

export const useConditions = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query ConditionsQuery {
      strapi {
        conditionContents {
          documentId
          site {
            domain
            siteName
          }
          ...ConditionFields
        }
      }
    }
  `);

  const formattedData = data.strapi.conditionContents.map((item) => {
    const validatedData = validateCondition(item);
    return {
      documentId: item.documentId,
      site: item.site,
      additionalData: validatedData,
    };
  });

  return useProcessData<ConditionBase>(formattedData, validateCondition, domain);
};
