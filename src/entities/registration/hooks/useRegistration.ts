import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { validateRegFormPromo } from "@entities/registration/lib";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

import { RegFormPromo } from "../model/types";

interface RegFormPromoContent {
  documentId: string;
  site?: {
    domain: string;
    siteName: string;
    discount: string;
  };
}

interface GraphQLResponse {
  strapi: {
    registrationFormPromoContents: RegFormPromoContent[];
  };
}

export const useRegistration = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query RegFormPromoQuery {
      strapi {
        registrationFormPromoContents {
          documentId
          site {
            domain
            siteName
            discount
          }
          ...RegFormPromoFields
        }
      }
    }
  `);

  // Выносим обработку данных в отдельный useMemo
  const processedData = useMemo(() => {
    const formattedData = data.strapi.registrationFormPromoContents.map((item) => {
      return validateRegFormPromo(item);
    });

    // Фильтрация по домену
    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.registrationFormPromoContents, domain]);

  // Используем упрощенный useProcessData только для обработки ошибок
  return useProcessData<RegFormPromo>(processedData);
};