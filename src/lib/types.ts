export type Smiski = {
  id: string;
  name: string;
  series: string;
  isSecret: boolean;
  count: number;
};

export type SmiskiSeries = {
  [series: string]: { name: string; isSecret: boolean }[];
};
