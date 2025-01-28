import { useStaticQuery, graphql } from 'gatsby';

import { FAQ , validateFAQ } from "@entities/faq";
import { useProcessData } from '@shared/hooks/useProcessData';



export const useFAQ = () => {
  const data = useStaticQuery(graphql`
    query FAQQuery {
      strapi {
        faqs {
          ...FAQFields
        }
      }
    }
  `);

  return useProcessData<FAQ>(data.strapi.faqs, validateFAQ);
};