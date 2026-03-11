export interface RowData {
  Cliente: string;
  Produto: string;
  "Classe SR": string;
  "Tipo produto": string;
  BOLETADO: any;
  "Fee bruto": any;
  "Repasse produto": any;
  Volume: any;
  Salário: any;
  Receita: any;
  "Salário Mapeado": any;
  Month: string;
}

export interface Filters {
  mes: string;
  produtos: string[];
  cliente: string;
  classesSR: string[];
}

export interface MonthlyData {
  mes: string;
  receita: number;
  salario: number;
}

export interface ClientData {
  cliente: string;
  receita: number;
  salario: number;
}

export interface ProductData {
  produto: string;
  receita: number;
  salario: number;
}
