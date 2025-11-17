import { useQuery } from "@tanstack/react-query";
import { ApiResponse, DataRecord, Filters } from "@/types/dashboard";

const API_URL = "https://script.google.com/macros/s/AKfycbwHKsc85VizBeRE78chyuiApw8y28dfWWPIOrF5sf139nthIGZkp9KUpzHqt-J_Gc0c/exec";

const MONTH_ORDER = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const useDashboardData = (filters: Filters) => {
  const { data: apiData, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      return response.json();
    },
    refetchInterval: 60000, // Atualiza a cada 1 minuto
  });

  const filteredData = apiData?.data.filter((record: DataRecord) => {
    // Regra fundamental: apenas boletado === true
    if (!record.boletado) return false;
    
    // Descartar receita nula, NaN ou zero
    if (!record.receitaBRL || isNaN(record.receitaBRL) || record.receitaBRL === 0) return false;

    // Aplicar filtros do usuário
    if (filters.mes !== "Todos" && record.mes !== filters.mes) return false;
    if (filters.produtos.length > 0 && !filters.produtos.includes(record.produto)) return false;
    if (filters.cliente && !record.cliente.toLowerCase().includes(filters.cliente.toLowerCase())) return false;
    if (filters.classesSR.length > 0 && !filters.classesSR.includes(record.classeSR)) return false;

    return true;
  }) || [];

  return {
    data: filteredData,
    apiData,
    isLoading,
    error,
    monthOrder: MONTH_ORDER,
  };
};
