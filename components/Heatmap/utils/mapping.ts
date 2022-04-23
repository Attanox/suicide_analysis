import { Attributes, Datum, K } from '../../../types';

export const getHeatMapData = (attributes: Attributes, familyId: string) => {
  const result = attributes
    .filter((d) => d.kindred === familyId)
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
