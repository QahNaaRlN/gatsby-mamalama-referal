import { useStaticQuery, graphql } from 'gatsby';

import { validateCondition } from "@entities/conditions";
import { ConditionBase } from "@entities/conditions/model";
import { useProcessData } from '@shared/hooks/useProcessData';
import { getCurrentDomain } from '@shared/lib/domain';

export const useConditions = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery(graphql`
    query ConditionsQuery {
      strapi {
        conditionContents {
          ...ConditionFields
        }
      }
    }
  `);

  return useProcessData<ConditionBase>(data.strapi.conditionContents, validateCondition, domain);
};
