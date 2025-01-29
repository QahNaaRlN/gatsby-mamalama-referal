import { useStaticQuery, graphql } from 'gatsby';

import { validateService } from '@entities/service/lib/validation';
import { ServiceType } from '@entities/service/model/consts';
import type { Service, UploadFile, PriceListItem } from '@entities/service/model/types';
import { useProcessData } from '@shared/hooks/useProcessData';
import { getCurrentDomain } from '@shared/lib/domain';

// Тип для GraphQL-ответа, включающий все поля Service
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
      // Поля для StandardService
      price?: number;
      discount?: number;
      percentageDiscount?: number;
      finalPrice?: number;
      unit?: string;
      // Поля для SpecialService
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

  const formattedData = data.strapi.serviceContents.map((item) => ({
    documentId: item.documentId,
    site: item.site,
    additionalData: item as Service // Теперь это безопасно, так как структура данных соответствует
  }));

  return useProcessData<Service>(formattedData, validateService, domain);
};