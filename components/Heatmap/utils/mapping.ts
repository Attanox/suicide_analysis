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
