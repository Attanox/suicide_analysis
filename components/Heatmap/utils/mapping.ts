import { Attributes, Datum, K, TNode } from '../../../types';

export const getHeatMapData = (
  attributes: Attributes,
  familyId: string,
  subtree: TNode[]
) => {
  const subtreeIds = subtree.map((_) => _.id);

  const result = attributes
    .filter((d) => d.kindred === familyId && subtreeIds.includes(d.personId))
    .map((d) => {
      const id = d.id;
      let record = {
        id,
      };

      (Object.keys(d) as K[])
        .filter((k) => k !== 'id')
        .forEach((k) => {
          const v = Number(d[k]);
          record = Object.assign(record, {
            [k]: v,
          });
        });

      return record;
    });

  return result;
};

export const getSumData = (
  attributes: Attributes,
  familyId: string,
  subtree: TNode[]
) => {
  const subtreeIds = subtree.map((_) => _.id);

  const familyData = attributes.filter(
    (d) => d.kindred === familyId && subtreeIds.includes(d.personId)
  );

  const result: { [key: string]: number } = {
    PD: 0,
    'PD-Cluster B-emotional': 0,
    'PD-Cluster C-anxiety': 0,
    alcohol: 0,
    'anxiety-non-trauma': 0,
    asthma: 0,
    'bipolar spectrum illness': 0,
    cardiovascular: 0,
    depression: 0,
    eating: 0,
    'immune-autoimmune': 0,
    'interpersonal trauma': 0,
    obesity: 0,
    psychosis: 0,
    'somatic disorder': 0,
  };

  familyData.forEach((d) => {
    Object.keys(d).forEach((k) => {
      if (k !== 'id' && k !== 'personId' && k !== 'kindred') {
        if (d[k as K]) {
          result[k] = result[k] + 1;
        }
      }
    });
  });

  return result;
};
