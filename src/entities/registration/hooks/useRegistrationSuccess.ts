import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { validateRegFormSuccess } from "@entities/registration/lib";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

import { RegFormSuccess } from "../model/types";

interface RegFormSuccessContent {
  documentId: string;
  site?: {
    domain: string;
    siteName: string;
    discount: string;
  };
}

interface GraphQLResponse {
  strapi: {
    registrationFormSuccessContents: RegFormSuccessContent[];
  };
}

export const useRegistrationSuccess = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query RegFormSuccessQuery {
      strapi {
        registrationFormSuccessContents {
          documentId
          site {
            domain
            siteName
            discount
          }
          ...RegFormSuccessFields
        }
      }
    }
  `);

  // Выносим обработку данных в отдельный useMemo
  const processedData = useMemo(() => {
    const formattedData = data.strapi.registrationFormSuccessContents.map((item) => {
      return validateRegFormSuccess(item);
    });

    // Фильтрация по домену
    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.registrationFormSuccessContents, domain]);

  // Используем упрощенный useProcessData только для обработки ошибок
  return useProcessData<RegFormSuccess>(processedData);
};