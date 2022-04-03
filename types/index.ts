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
  suicide: boolean;
  id: string;
  kindred: string;
};

export type Data = Datum[];
