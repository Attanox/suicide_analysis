import { Attributes, K } from '../../../types';

type BarDatum = {
  familyId: string;
  suicides: number;
} & { [key: string]: string | number };

type BarData = BarDatum[];

export const getBarData = (
  attributes: Attributes,
  attribute: K | ''
): BarData => {
  const familyData: {
    [key: string]: any;
  } = {};

  attributes.forEach((a) => {
    if (a.kindred in familyData) {
      familyData[a.kindred].suicides = familyData[a.kindred].suicides + 1;

      if (attribute && a[attribute]) {
        const addTo = familyData[a.kindred][attribute] || 0;
        familyData[a.kindred][attribute] = addTo + 1;
      }
    } else {
      familyData[a.kindred] = {};
      familyData[a.kindred].suicides = 1;

      if (attribute && a[attribute]) {
        familyData[a.kindred][attribute] = 1;
      }
    }
  });

  return Object.keys(familyData).map((k) => {
    return {
      familyId: k,
      suicides: familyData[k].suicides,
      [attribute]: familyData[k][attribute],
    };
  });
};
