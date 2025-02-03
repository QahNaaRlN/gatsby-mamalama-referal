import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { validateService } from "@entities/service/lib/validation";
import { ServiceType } from "@entities/service/model/consts";
import type { PriceListItem, Service, UploadFile } from "@entities/service/model/types";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

interface GraphQLResponse {
  strapi: {
    serviceContents: {
      documentId: string;
      title: string;
      description: object;
      duration: number;
      type: ServiceType;
      picture: UploadFile;
      pictureClassnames?: string;
      price?: number;
      discount?: number;
      percentageDiscount?: number;
      finalPrice?: number;
      unit?: string;
      priceList?: PriceListItem[];
      site?: {
        domain: string;
        siteName: string;
      };
    }[];
  };
}

export const useServices = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query ServicesContentQuery {
      strapi {
        serviceContents {
          documentId
          site {
            domain
            siteName
          }
          ...ServiceContentFields
        }
      }
    }
  `);

  // Выносим обработку данных в отдельный useMemo
  const processedData = useMemo(() => {
    const formattedData = data.strapi.serviceContents.map((item) => {
      return validateService(item);
    });

    // Фильтрация по домену
    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.serviceContents, domain]);

  // Используем упрощенный useProcessData только для обработки ошибок
  return useProcessData<Service>(processedData);
};