import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { FAQ, validateFAQ } from "@entities/faq";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

interface FAQContent {
  documentId: string;
  question: string;
  answer: string;
  isExpanded: boolean;
  site?: {
    domain: string;
    siteName: string;
  };
}

interface GraphQLResponse {
  strapi: {
    faqContents: FAQContent[];
  };
}

export const useFAQ = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query FAQQuery {
      strapi {
        faqContents {
          documentId
          site {
            domain
            siteName
          }
          ...FAQFields
        }
      }
    }
  `);

  // Выносим обработку данных в отдельный useMemo
  const processedData = useMemo(() => {
    const formattedData = data.strapi.faqContents.map((item) => {
      return validateFAQ(item);
    });

    // Фильтрация по домену
    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.faqContents, domain]);

  // Используем упрощенный useProcessData только для обработки ошибок
  return useProcessData<FAQ>(processedData);
};