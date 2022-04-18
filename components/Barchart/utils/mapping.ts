import { Attributes, K } from '../../../types';

type BarDatum = {
  familyId: string;
  suicides: number;
} & { [key: string]: string | number };

type BarData = BarDatum[];

export const getBarData = (
  attributes: Attributes,
  attribute: Array<K | ''>
): BarData => {
  const familyData: {
    [key: string]: any;
  } = {};

  attributes.forEach((a) => {
    if (a.kindred in familyData) {
      familyData[a.kindred].suicides = familyData[a.kindred].suicides + 1;

      attribute.forEach((attr) => {
        if (attr && a[attr]) {
          const addTo = familyData[a.kindred][attr] || 0;
          familyData[a.kindred][attr] = addTo + 1;
        }
      });
    } else {
      familyData[a.kindred] = {};
      familyData[a.kindred].suicides = 1;

      attribute.forEach((attr) => {
        if (attr && a[attr]) {
          familyData[a.kindred][attr] = 1;
        }
      });
    }
  });

  return Object.keys(familyData).map((k) => {
    const result: any = {
      familyId: k,
      suicides: familyData[k].suicides,
    };
    attribute.forEach((attr) => {
      result[attr] = familyData[k][attr];
    });
    return result;
  });
};
