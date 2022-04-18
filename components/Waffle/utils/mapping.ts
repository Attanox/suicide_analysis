import { Attributes, Datum, K } from '../../../types';

export const getWaffleData = (
  attributes: Attributes,
  familyId: string,
  attribute: Array<K | ''> = ['']
) => {
  const familyData = attributes.filter((d) => d.kindred === familyId);

  const result = [
    {
      id: 'suicides',
      label: 'suicides',
      value: familyData.length,
      color: '#468df3',
    },
  ];

  if (attribute) {
    attribute.forEach((a) => {
      if (a) {
        result.push({
          id: a,
          label: a,
          value: 0,
          color: '#a053f0',
        });
      }
    });
  }

  familyData.forEach((d) => {
    (Object.keys(d) as K[]).forEach((k) => {
      if (attribute.includes(k)) {
        result[1].value += Number(d[k]);
      }
    });
  });

  return result;
};
