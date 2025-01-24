import { useStaticQuery, graphql } from 'gatsby';

import { FAQ } from "@entities/faq";
import { useProcessData } from '@shared/hooks/useProcessData';

import { validateFAQ } from '../lib/validateFAQ';

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