import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ProductData } from "@/types/dashboard";
import { formatCurrency } from "@/utils/formatters";

interface ProductChartsProps {
  data: ProductData[];
}

export const ProductCharts = ({ data }: ProductChartsProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="font-semibold text-card-foreground mb-1">{label}</p>
          <p className="text-sm">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const receitaData = [...data].sort((a, b) => b.receita - a.receita);
  const salarioData = [...data].sort((a, b) => b.salario - a.salario);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Receita por Produto</CardTitle>
          <CardDescription>Distribuição de receita por tipo de produto</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={receitaData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}K`}
              />
              <YAxis 
                dataKey="produto" 
                type="category" 
                width={120}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="receita" 
                fill="hsl(var(--chart-revenue))" 
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Salário por Produto</CardTitle>
          <CardDescription>Distribuição de comissão por tipo de produto</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salarioData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}K`}
              />
              <YAxis 
                dataKey="produto" 
                type="category" 
                width={120}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="salario" 
                fill="hsl(var(--chart-salary))" 
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};
