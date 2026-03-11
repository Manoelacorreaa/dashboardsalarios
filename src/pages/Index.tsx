import { useState, useMemo } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { Filters, RowData } from "@/types/dashboard";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { KPICard } from "@/components/dashboard/KPICard";
import { MonthlyChart } from "@/components/dashboard/MonthlyChart";
import { TopClientsCharts } from "@/components/dashboard/TopClientsCharts";
import { ProductCharts } from "@/components/dashboard/ProductCharts";
import { DataTable } from "@/components/dashboard/DataTable";
import { ExecutiveSummary } from "@/components/dashboard/ExecutiveSummary";
import { formatCurrency } from "@/utils/formatters";
import {
  calculateTotals,
  calculateMonthlyData,
  findBestSalaryMonth,
  calculateTopClients,
  calculateProductData,
} from "@/utils/calculations";
import { TrendingUp, DollarSign, Briefcase, Trophy, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [filters, setFilters] = useState<Filters>({
    mes: "Todos",
    produtos: [],
    cliente: "",
    classesSR: [],
  });

  const { data, apiData, isLoading, error, monthOrder } = useDashboardData(filters);

  const availableMeses = useMemo(() => {
    if (!apiData?.data) return [];
    const meses = [...new Set(apiData.data.map((r: RowData) => r.Month).filter(Boolean))];
    return monthOrder.filter((m) => meses.includes(m));
  }, [apiData, monthOrder]);

  const availableProdutos = useMemo(() => {
    if (!apiData?.data) return [];
    return [...new Set(apiData.data.map((r: RowData) => r.Produto).filter(Boolean))].sort();
  }, [apiData]);

  const availableClasses = useMemo(() => {
    if (!apiData?.data) return [];
    return [...new Set(apiData.data.map((r: RowData) => r["Classe SR"]).filter(Boolean))].sort();
  }, [apiData]);

  const totals = useMemo(() => calculateTotals(data), [data]);
  const monthlyData = useMemo(() => calculateMonthlyData(data, monthOrder), [data, monthOrder]);
  const bestSalaryMonth = useMemo(() => findBestSalaryMonth(monthlyData), [monthlyData]);
  const topClients = useMemo(() => calculateTopClients(data), [data]);
  const productData = useMemo(() => calculateProductData(data), [data]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Erro ao carregar dados: {(error as Error).message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Dashboard Receita & Salário
          </h1>
          <p className="text-muted-foreground">
            Fonte: Google Sheets via Apps Script
          </p>
        </header>

        <DashboardFilters
          filters={filters}
          setFilters={setFilters}
          availableMeses={availableMeses}
          availableProdutos={availableProdutos}
          availableClasses={availableClasses}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Receita Total"
            value={formatCurrency(totals.receita)}
            description="Receita no período"
            icon={DollarSign}
            variant="revenue"
          />
          <KPICard
            title="Salário Total"
            value={formatCurrency(totals.salario)}
            description="Salário Mapeado"
            icon={TrendingUp}
            variant="salary"
          />
          <KPICard
            title="Volume Total"
            value={formatCurrency(totals.volume)}
            description="Volume financeiro operado"
            icon={Briefcase}
          />
          {bestSalaryMonth && (
            <KPICard
              title="Melhor Mês de Salário"
              value={formatCurrency(bestSalaryMonth.salario)}
              description={bestSalaryMonth.mes}
              icon={Trophy}
              variant="salary"
            />
          )}
        </div>

        <MonthlyChart data={monthlyData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopClientsCharts
            byReceita={topClients.byReceita}
            bySalario={topClients.bySalario}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductCharts data={productData} />
        </div>

        {topClients.byReceita[0] && productData[0] && bestSalaryMonth && (
          <ExecutiveSummary
            receitaTotal={totals.receita}
            salarioTotal={totals.salario}
            mesTopSalario={bestSalaryMonth.mes}
            valorTopSalario={bestSalaryMonth.salario}
            clienteTopReceita={topClients.byReceita[0].cliente}
            valorClienteTopReceita={topClients.byReceita[0].receita}
            produtoTopReceita={productData[0].produto}
            valorProdutoTopReceita={productData[0].receita}
          />
        )}

        <DataTable data={data} />
      </div>
    </div>
  );
};

export default Index;
