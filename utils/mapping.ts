import type { Attributes } from '../types';
import * as attributes from '../public/attributes.json';
import * as structure from '../public/structure.json';

const getBool = (d: string): boolean => {
  if (d === 'True') return true;
  return false;
};

export const getAttributes = () => {
  const result: Attributes = attributes.map((d) => {
    const matchingStructure = structure.find((s) => s.personid === d.personid);

    return {
      id: String(d.personid),
      PD: getBool(d['PD']),
      'PD-Cluster B-emotional': getBool(d['PD-Cluster B-emotional']),
      'PD-Cluster C-anxiety': getBool(d['PD-Cluster C-anxiety']),
      alcohol: getBool(d['alcohol']),
      'anxiety-non-trauma': getBool(d['anxiety-non-trauma']),
      asthma: getBool(d['asthma']),
      'bipolar spectrum illness': getBool(d['bipolar spectrum illness']),
      cardiovascular: getBool(d['cardiovascular']),
      depression: getBool(d['depression']),
      eating: getBool(d['eating']),
      'immune-autoimmune': getBool(d['immune-autoimmune']),
      'interpersonal trauma': getBool(d['interpersonal trauma']),
      obesity: getBool(d['obesity']),
      psychosis: getBool(d['psychosis']),
      'somatic disorder': getBool(d['somatic disorder']),
      kindred: String(matchingStructure?.KindredID),
    };
  });

  return result;
};

export const getFamilyIds = () => {
  const result = structure
    .map((d) => String(d['KindredID']))
    .sort((a, b) => Number(a) - Number(b));

  return Array.from(new Set(result));
};

export const getTotal = (familyId: string) => {
  return structure.filter((d) => String(d['KindredID']) === familyId).length;
};
