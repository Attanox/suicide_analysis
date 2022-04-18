import type { Attributes, Structure } from '../types';
import * as attributes from '../public/attributes.json';
import * as structure from '../public/structure.json';
import type { Node } from 'relatives-tree/lib/types';

const getBool = (d: string): boolean => {
  if (d === 'True') return true;
  return false;
};

export const getAttributes = () => {
  const result: Attributes = attributes
    .sort((a, b) => {
      const a_structure = structure.find((s) => s.personid === a.personid);
      const b_structure = structure.find((s) => s.personid === b.personid);

      const aBdate = a_structure?.bdate || 0;
      const bBdate = b_structure?.bdate || 0;

      return aBdate > bBdate ? 1 : -1;
    })
    .map((d) => {
      const matchingStructure = structure.find(
        (s) => s.personid === d.personid
      );

      return {
        id: `${matchingStructure?.bdate}_${matchingStructure?.sex}`,
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

const getID = (v: Structure) => `${v.bdate}_${v.sex}`;

export const getTreeStructure = async (familyId: string) => {
  const result: Array<Node> = [];

  const marriage: { [key: number]: number } = {};
  const family = structure.filter((s) => String(s.KindredID) === familyId);

  family.forEach((member) => {
    if (member.PaID && member.MaID) {
      marriage[member.PaID] = member.MaID;
      marriage[member.MaID] = member.PaID;
    }
  });

  family.forEach((member) => {
    const n: { [key: string]: any } = {};

    const spouse = marriage[member.RelativeID];

    const id = member.RelativeID;

    n['id'] = id;
    n['displayId'] = getID(member);

    n['gender'] = `${member?.sex === 'M' ? 'male' : 'female'}`;
    n['parents'] = [];
    if (member.PaID) n['parents'].push({ id: `${member.PaID}`, type: 'blood' });
    if (member.MaID) n['parents'].push({ id: `${member.MaID}`, type: 'blood' });

    n['children'] = family
      .filter(
        (m) => m.MaID === member.RelativeID || m.PaID === member.RelativeID
      )
      .map((m) => ({ id: m.RelativeID, type: 'blood' }));
    n['siblings'] = family
      .filter(
        (m) =>
          ((m.MaID && m.MaID === member.MaID) ||
            (m.PaID && m.PaID === member.PaID)) &&
          m.RelativeID !== member.RelativeID
      )
      .map((m) => ({ id: m.RelativeID, type: 'blood' }));
    n['spouses'] = spouse
      ? [
          {
            id: spouse,
            type: 'married',
          },
        ]
      : [];

    result.push(n as Node);
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
