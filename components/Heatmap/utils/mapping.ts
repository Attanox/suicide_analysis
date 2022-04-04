import { Attributes, Datum } from '../../../types';

type K = keyof Datum;

const colors: { [k: string]: string } = {
  '1': 'hsl(165, 70%, 50%)',
  '0': 'hsl(181, 70%, 50%)',
};

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
            [`${k}Color`]: colors[String(v)],
          });
        });

      return record;
    });

  return result;
};
