export type Prefecture = {
  name: string;
  id: number;
};

export type PopulationData = {
  year: number;
  value: number;
};

export type PopulationByYear = {
  pref: Prefecture;
  data: PopulationData[];
};
