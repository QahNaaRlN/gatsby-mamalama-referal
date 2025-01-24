import { useStaticQuery, graphql } from 'gatsby';

import { useProcessData } from '@shared/hooks/useProcessData';

import { validateService } from '../lib/validation';
import type { Service } from '../model/types';

export const useServices = () => {
  const data = useStaticQuery(graphql`
    query ServicesQuery {
      strapi {
        services {
          ...ServiceFields
        }
      }
    }
  `);

  console.log('Data from GraphQL:', data);

  return useProcessData<Service>(data.strapi.services, validateService);
};