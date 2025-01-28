import { useStaticQuery, graphql } from 'gatsby';

import { validateCondition } from "@entities/conditions";
import { Condition } from "@entities/conditions/model";
import { useProcessData } from '@shared/hooks/useProcessData';


export const useConditions = () => {
  const data = useStaticQuery(graphql`
    query ConditionsQuery {
      strapi {
        conditions {
          ...ConditionFields
        }
      }
    }
  `);

  return useProcessData<Condition>(data.strapi.conditions, validateCondition);
};