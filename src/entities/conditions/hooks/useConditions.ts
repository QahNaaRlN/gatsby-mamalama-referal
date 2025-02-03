import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { validateCondition } from "@entities/conditions";
import { ConditionBase } from "@entities/conditions/model";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

interface ConditionContent {
  documentId: string;
  title: string;
  description: object;
  isActive: boolean;
  condition: {
    documentId: string;
  };
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

  // Выносим обработку данных в отдельный useMemo
  const processedData = useMemo(() => {
    const formattedData = data.strapi.conditionContents.map((item) => {
      return validateCondition(item);
    });

    // Фильтрация по домену
    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.conditionContents, domain]);

  // Используем упрощенный useProcessData только для обработки ошибок
  return useProcessData<ConditionBase>(processedData);
};