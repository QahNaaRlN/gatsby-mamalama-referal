import { useStaticQuery, graphql } from 'gatsby';

import { useProcessData } from '@shared/hooks/useProcessData';
import { getCurrentDomain } from '@shared/lib/domain';

import { validateService } from '../lib/validation';
import type { Service } from '../model/types';

export const useServices = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery(graphql`
    query ServicesContentQuery {
      strapi {
        serviceContents {
          ...ServiceContentFields
          site {
            domain
          }
        }
      }
    }
  `);

  return useProcessData<Service>(data.strapi.serviceContents, validateService, domain);
};
