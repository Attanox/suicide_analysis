import { Attributes, Datum, K, TNode } from '../../../types';

export const getWaffleData = (
  attributes: Attributes,
  familyId: string,
  attribute: Array<K | ''> = [''],
  subtree: TNode[]
) => {
  const subtreeIds = subtree.map((_) => _.id);

  const familyData = attributes.filter(
    (d) => d.kindred === familyId && subtreeIds.includes(d.personId)
  );

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
    attribute.forEach((a) => {
      const idx = result.findIndex((r) => r.id === a);
      if (idx !== -1 && a) {
        result[idx].value += Number(d[a]);
      }
    });
  });

  return result;
};
