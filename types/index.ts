import structure from '../public/structure.json';
import type { ExtNode, Node } from 'relatives-tree/lib/types';

export type Datum = {
  PD: boolean;
  'PD-Cluster B-emotional': boolean;
  'PD-Cluster C-anxiety': boolean;
  alcohol: boolean;
  'anxiety-non-trauma': boolean;
  asthma: boolean;
  'bipolar spectrum illness': boolean;
  cardiovascular: boolean;
  depression: boolean;
  eating: boolean;
  'immune-autoimmune': boolean;
  'interpersonal trauma': boolean;
  obesity: boolean;
  psychosis: boolean;
  'somatic disorder': boolean;
  id: string;
  kindred: string;
  personId: string;
};

export type K = keyof Datum;

export type Attributes = Datum[];

export type Structure = typeof structure[0];

export type TExtNode = ExtNode & {
  displayId: string;
  attributes: Datum | undefined;
};

export type TNode = Node & {
  readonly displayId: string;
  attributes: Datum | undefined;
};
