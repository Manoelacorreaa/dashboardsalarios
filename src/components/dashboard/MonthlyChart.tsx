import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MonthlyData } from "@/types/dashboard";
import { formatCurrency } from "@/utils/formatters";

interface MonthlyChartProps {
  data: MonthlyData[];
}

export const MonthlyChart = ({ data }: MonthlyChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="font-semibold text-card-foreground mb-2">{payload[0].payload.mes}</p>
          <p className="text-sm text-primary">
            Receita: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-secondary">
            Salário: {formatCurrency(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Evolução Mensal - Receita x Salário</CardTitle>
        <CardDescription>Comparação mês a mês das métricas principais</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="mes" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="receita" 
              fill="hsl(var(--chart-revenue))" 
              name="Receita" 
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="salario" 
              fill="hsl(var(--chart-salary))" 
              name="Salário" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
