import { useStaticQuery, graphql } from 'gatsby';

import { validateRegFormPromo } from "@entities/registration/lib";
import { useProcessData } from '@shared/hooks/useProcessData';
import { getCurrentDomain } from '@shared/lib/domain';

import { RegFormPromo } from "../model/types";

interface RegFormPromoContent {
  documentId: string;
  site?: {
    domain: string;
    siteName: string;
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
            }
            ...RegFormPromoFields
        }
      }
    }
  `);

  const formattedData = data.strapi.registrationFormPromoContents.map((item) => {
    const validatedData = validateRegFormPromo(item);
    return {
      documentId: item.documentId,
      site: item.site,
      additionalData: validatedData,
    };
  });

  return useProcessData<RegFormPromo>(formattedData, validateRegFormPromo, domain);
};