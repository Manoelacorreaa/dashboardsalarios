import { DataRecord, MonthlyData, ClientData, ProductData } from "@/types/dashboard";

export const calculateTotals = (data: DataRecord[]) => {
  return data.reduce(
    (acc, record) => ({
      receita: acc.receita + record.receitaBRL,
      salario: acc.salario + record.salarioBRL,
      volume: acc.volume + record.volumeBRL,
    }),
    { receita: 0, salario: 0, volume: 0 }
  );
};

export const calculateMonthlyData = (data: DataRecord[], monthOrder: string[]): MonthlyData[] => {
  const monthlyMap = data.reduce((acc, record) => {
    const mes = record.mes;
    if (!acc[mes]) {
      acc[mes] = { mes, receita: 0, salario: 0 };
    }
    acc[mes].receita += record.receitaBRL;
    acc[mes].salario += record.salarioBRL;
    return acc;
  }, {} as Record<string, MonthlyData>);

  return monthOrder
    .map(mes => monthlyMap[mes])
    .filter(Boolean);
};

export const findBestSalaryMonth = (monthlyData: MonthlyData[]) => {
  if (monthlyData.length === 0) return null;
  return monthlyData.reduce((best, current) => 
    current.salario > best.salario ? current : best
  );
};

export const calculateTopClients = (data: DataRecord[], limit: number = 10) => {
  const clientMap = data.reduce((acc, record) => {
    const cliente = record.cliente;
    if (!acc[cliente]) {
      acc[cliente] = { cliente, receita: 0, salario: 0 };
    }
    acc[cliente].receita += record.receitaBRL;
    acc[cliente].salario += record.salarioBRL;
    return acc;
  }, {} as Record<string, ClientData>);

  const clients = Object.values(clientMap);
  
  return {
    byReceita: [...clients].sort((a, b) => b.receita - a.receita).slice(0, limit),
    bySalario: [...clients].sort((a, b) => b.salario - a.salario).slice(0, limit),
  };
};

export const calculateProductData = (data: DataRecord[]): ProductData[] => {
  const productMap = data.reduce((acc, record) => {
    const produto = record.produto;
    if (!acc[produto]) {
      acc[produto] = { produto, receita: 0, salario: 0 };
    }
    acc[produto].receita += record.receitaBRL;
    acc[produto].salario += record.salarioBRL;
    return acc;
  }, {} as Record<string, ProductData>);

  return Object.values(productMap).sort((a, b) => b.receita - a.receita);
};
