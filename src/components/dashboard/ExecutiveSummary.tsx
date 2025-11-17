import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";
import { FileText } from "lucide-react";

interface ExecutiveSummaryProps {
  receitaTotal: number;
  salarioTotal: number;
  mesTopSalario: string;
  valorTopSalario: number;
  clienteTopReceita: string;
  valorClienteTopReceita: number;
  produtoTopReceita: string;
  valorProdutoTopReceita: number;
}

export const ExecutiveSummary = ({
  receitaTotal,
  salarioTotal,
  mesTopSalario,
  valorTopSalario,
  clienteTopReceita,
  valorClienteTopReceita,
  produtoTopReceita,
  valorProdutoTopReceita,
}: ExecutiveSummaryProps) => {
  return (
    <Card className="col-span-full bg-muted/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>Resumo Executivo</CardTitle>
        </div>
        <CardDescription>Principais insights do período selecionado</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-foreground leading-relaxed">
        <p>
          No período selecionado, a receita total foi de{" "}
          <span className="font-semibold text-primary">{formatCurrency(receitaTotal)}</span> e o
          salário total foi de{" "}
          <span className="font-semibold text-secondary">{formatCurrency(salarioTotal)}</span>.
        </p>
        <p>
          O melhor mês de salário foi{" "}
          <span className="font-semibold">{mesTopSalario}</span>, com{" "}
          <span className="font-semibold text-secondary">{formatCurrency(valorTopSalario)}</span>.
        </p>
        <p>
          O cliente <span className="font-semibold">{clienteTopReceita}</span> foi o maior gerador
          de receita, com{" "}
          <span className="font-semibold text-primary">{formatCurrency(valorClienteTopReceita)}</span>.
        </p>
        <p>
          O produto <span className="font-semibold">{produtoTopReceita}</span> concentrou a maior
          parte da receita, totalizando{" "}
          <span className="font-semibold text-primary">{formatCurrency(valorProdutoTopReceita)}</span>.
        </p>
      </CardContent>
    </Card>
  );
};
