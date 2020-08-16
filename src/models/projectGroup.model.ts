export type ProjectGroup = {
  id?: string;
  name: string;
  description?: string;
  logo?: number;
  color?: string;
  parentId: string;
  companyId: string;
  lvl: number;
  descendants: string[];
};
