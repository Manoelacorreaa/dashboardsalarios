export interface RawData {
  feeBruto: string;
  repasseProduto: string;
  volume: string;
  salario: string;
  receita: string;
}

export interface DataRecord {
  cliente: string | null;
  produto: string | null;
  classeSR: string | null;
  tipoProduto: string | null;
  boletado: boolean | null;
  feeBrutoPercent: number | null;
  repasseProdutoPercent: number | null;
  volumeBRL: number | null;
  salarioBRL: number | null;
  receitaBRL: number | null;
  mes: string | null;
  raw: RawData;
}

export interface ApiResponse {
  updatedAt: string;
  totalRegistros: number;
  filtros: {
    mes: string;
    boletado: boolean;
  };
  data: DataRecord[];
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
