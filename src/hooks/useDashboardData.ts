import { useQuery } from "@tanstack/react-query";
import { Filters, RowData } from "@/types/dashboard";

const API_URL = "https://script.google.com/macros/s/AKfycbxPp11kRvUl-SAiArLPmTIobwtj835g7zCaQleQT8KcSUcQw1Y4Tg8cSAsInASrQ6Ke/exec";

const MONTH_ORDER = [
  "Janeiro/2026", "Fevereiro/2026", "Março/2026", "Abril/2026",
  "Maio/2026", "Junho/2026", "Julho/2026", "Agosto/2026",
  "Setembro/2026", "Outubro/2026", "Novembro/2026", "Dezembro/2026",
];

export const useDashboardData = (filters: Filters) => {
  const { data: apiData, isLoading, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao carregar dados da planilha");
      return response.json();
    },
  });

  const filteredData = (apiData?.data || []).filter((row: RowData) => {
    const matchMes = filters.mes === "Todos" || row.Month === filters.mes;
    const matchProduto = filters.produtos.length === 0 || filters.produtos.includes(row.Produto);
    const matchCliente = !filters.cliente || (row.Cliente || "").toLowerCase().includes(filters.cliente.toLowerCase());
    const matchClasse = filters.classesSR.length === 0 || filters.classesSR.includes(row["Classe SR"]);
    return matchMes && matchProduto && matchCliente && matchClasse;
  });

  return { data: filteredData, apiData, isLoading, error, monthOrder: MONTH_ORDER };
};
