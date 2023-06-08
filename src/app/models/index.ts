export interface UserData {
  id: number;
  name: string;
  username: string;
}

export interface Entity {
  id: number;
  companyName: string;
  corporateName: string;
  cnpj: string;
  specialties: string[];
  region: string;
  openingDate: string;
  isActive: boolean;
}
