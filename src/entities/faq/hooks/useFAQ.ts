import { useStaticQuery, graphql } from 'gatsby';

import { FAQ, validateFAQ } from "@entities/faq";
import { useProcessData } from '@shared/hooks/useProcessData';
import { getCurrentDomain } from '@shared/lib/domain';

interface FAQContent {
  documentId: string;
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

  const formattedData = data.strapi.faqContents.map((item) => {
    const validatedData = validateFAQ(item);
    return {
      documentId: item.documentId,
      site: item.site,
      additionalData: validatedData,
    };
  });

  return useProcessData<FAQ>(formattedData, validateFAQ, domain);
};
