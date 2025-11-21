import { useQuery } from "@tanstack/react-query";
import { ApiResponse, DataRecord, Filters } from "@/types/dashboard";

const API_URL = "https://script.google.com/macros/s/AKfycbytPGFHTbz2ufAmiHC4qgwNIKqFYkwChRmwi5c38SEcf-e8dP9QtQ2-6jlVedUwdV4/exec";

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

  // Debug: verificar dados de Novembro
  const novembroData = apiData?.data.filter((r: DataRecord) => r.mes === "Novembro") || [];
  const novembroBoletado = novembroData.filter((r: DataRecord) => r.boletado);
  const novembroSalarioTotal = novembroBoletado.reduce((sum, r) => sum + (r.salarioBRL || 0), 0);
  
  console.log("=== DEBUG NOVEMBRO ===");
  console.log("Total registros Novembro:", novembroData.length);
  console.log("Registros boletados:", novembroBoletado.length);
  console.log("Salário total (boletados):", novembroSalarioTotal);
  console.log("Registros com receita zero/nula:", 
    novembroBoletado.filter(r => !r.receitaBRL || isNaN(r.receitaBRL) || r.receitaBRL === 0).length
  );

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
  
  // Debug: salário após filtros
  const novembroFiltrado = filteredData.filter(r => r.mes === "Novembro");
  const salarioFiltrado = novembroFiltrado.reduce((sum, r) => sum + (r.salarioBRL || 0), 0);
  console.log("Registros Novembro após filtros:", novembroFiltrado.length);
  console.log("Salário Novembro após filtros:", salarioFiltrado);
  console.log("===================");

  return {
    data: filteredData,
    apiData,
    isLoading,
    error,
    monthOrder: MONTH_ORDER,
  };
};
