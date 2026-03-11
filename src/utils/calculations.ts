import { RowData, MonthlyData, ClientData, ProductData } from "@/types/dashboard";

const parseValue = (val: any): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const cleaned = String(val)
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();
  return parseFloat(cleaned) || 0;
};

export const calculateTotals = (data: RowData[]) => {
  return data.reduce((acc, curr) => ({
    receita: acc.receita + parseValue(curr.Receita),
    salario: acc.salario + parseValue(curr["Salário Mapeado"]),
    volume: acc.volume + parseValue(curr.Volume),
  }), { receita: 0, salario: 0, volume: 0 });
};

export const calculateMonthlyData = (data: RowData[], monthOrder: string[]): MonthlyData[] => {
  const map = data.reduce((acc, curr) => {
    const m = curr.Month;
    if (!m) return acc;
    if (!acc[m]) acc[m] = { mes: m, receita: 0, salario: 0 };
    acc[m].receita += parseValue(curr.Receita);
    acc[m].salario += parseValue(curr["Salário Mapeado"]);
    return acc;
  }, {} as Record<string, MonthlyData>);
  return monthOrder.filter(m => map[m]).map(m => map[m]);
};

export const findBestSalaryMonth = (monthlyData: MonthlyData[]) => {
  if (monthlyData.length === 0) return null;
  return [...monthlyData].sort((a, b) => b.salario - a.salario)[0];
};

export const calculateTopClients = (data: RowData[]) => {
  const map = data.reduce((acc, curr) => {
    const c = curr.Cliente || "Indefinido";
    if (!acc[c]) acc[c] = { cliente: c, receita: 0, salario: 0 };
    acc[c].receita += parseValue(curr.Receita);
    acc[c].salario += parseValue(curr["Salário Mapeado"]);
    return acc;
  }, {} as Record<string, ClientData>);
  const sorted = Object.values(map);
  return {
    byReceita: [...sorted].sort((a, b) => b.receita - a.receita).slice(0, 10),
    bySalario: [...sorted].sort((a, b) => b.salario - a.salario).slice(0, 10),
  };
};

export const calculateProductData = (data: RowData[]): ProductData[] => {
  const map = data.reduce((acc, curr) => {
    const p = curr.Produto || "Outros";
    if (!acc[p]) acc[p] = { produto: p, receita: 0, salario: 0 };
    acc[p].receita += parseValue(curr.Receita);
    acc[p].salario += parseValue(curr["Salário Mapeado"]);
    return acc;
  }, {} as Record<string, ProductData>);
  return Object.values(map).sort((a, b) => b.receita - a.receita);
};
