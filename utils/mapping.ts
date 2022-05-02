import type { Attributes, Datum, K, Structure, TNode } from '../types';
import attributes from '../public/attributes.json';
import structure from '../public/structure.json';
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
        id: `${matchingStructure?.bdate}_${matchingStructure?.sex}(${d.personid})`,
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

export const getTreeStructure = (familyId: string) => {
  const result: Array<TNode> = [];

  const marriage: { [key: number]: Set<number> } = {};
  const family = structure.filter((s) => String(s.KindredID) === familyId);

  family.forEach((member) => {
    if (member.PaID && member.MaID) {
      if (marriage[member.PaID]) {
        marriage[member.PaID] = marriage[member.PaID].add(member.MaID);
      } else {
        marriage[member.PaID] = new Set([member.MaID]);
      }
      if (marriage[member.MaID]) {
        marriage[member.MaID] = marriage[member.MaID].add(member.PaID);
      } else {
        marriage[member.MaID] = new Set([member.PaID]);
      }
    }
  });

  family
    .sort((a, b) => {
      const aBirth = a.bdate;
      const bBirth = b.bdate;

      return aBirth > bBirth ? 1 : -1;
    })
    .forEach((member) => {
      const n: { [key: string]: any } = {};

      const spouse = marriage[member.RelativeID];

      const id = String(member.RelativeID);

      const matchingAttributes = getAttributes().find(
        (a) => a.id === `${member?.bdate}_${member?.sex}(${member.personid})`
      );

      n['id'] = id;
      n['displayId'] = getID(member);

      n['gender'] = `${member?.sex === 'M' ? 'male' : 'female'}`;
      n['parents'] = [];
      if (member.PaID)
        n['parents'].push({ id: `${member.PaID}`, type: 'blood' });
      if (member.MaID)
        n['parents'].push({ id: `${member.MaID}`, type: 'blood' });

      n['children'] = family
        .filter(
          (m) => m.MaID === member.RelativeID || m.PaID === member.RelativeID
        )
        .map((m) => ({ id: String(m.RelativeID), type: 'blood' }));
      n['siblings'] = family
        .filter(
          (m) =>
            ((m.MaID && m.MaID === member.MaID) ||
              (m.PaID && m.PaID === member.PaID)) &&
            m.RelativeID !== member.RelativeID
        )
        .map((m) => ({ id: String(m.RelativeID), type: 'blood' }));
      n['spouses'] = spouse
        ? Array.from(spouse).map((s) => {
            return {
              id: String(s),
              type: 'married',
            };
          })
        : [];
      n['attributes'] = matchingAttributes || null;

      result.push(n as TNode);
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

export const getDisplayAttributes = (attributes: Attributes) => {
  const firstAttr: Partial<Pick<Datum, 'id' | 'kindred'>> &
    Omit<Datum, 'id' | 'kindred'> = { ...attributes[0] };
  delete firstAttr['id'];
  delete firstAttr['kindred'];
  const res = Object.keys(firstAttr);
  return res;
};

export const getColor = (attribute: Omit<K, 'id' | 'kindred'>) => {
  const colorMap: { [key: string]: string } = {
    PD: 'var(--PD)',
    'PD-Cluster B-emotional': 'var(--PD-Cluster-B-emotional)',
    'PD-Cluster C-anxiety': 'var(--PD-Cluster-C-anxiety)',
    alcohol: 'var(--alcohol)',
    'anxiety-non-trauma': 'var(--anxiety-non-trauma)',
    asthma: 'var(--asthma)',
    'bipolar spectrum illness': 'var(--bipolar-spectrum-illness)',
    cardiovascular: 'var(--cardiovascular)',
    depression: 'var(--depression)',
    eating: 'var(--eating)',
    'immune-autoimmune': 'var(--immune-autoimmune)',
    'interpersonal trauma': 'var(--interpersonal-trauma)',
    obesity: 'var(--obesity)',
    psychosis: 'var(--psychosis)',
    'somatic disorder': 'var(--somatic-disorder)',
  };

  return colorMap[attribute as string];
};
