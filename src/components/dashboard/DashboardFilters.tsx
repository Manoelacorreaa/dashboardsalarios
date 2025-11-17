import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filters } from "@/types/dashboard";
import { Filter } from "lucide-react";

interface DashboardFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  availableMeses: string[];
  availableProdutos: string[];
  availableClasses: string[];
}

export const DashboardFilters = ({
  filters,
  setFilters,
  availableMeses,
  availableProdutos,
  availableClasses,
}: DashboardFiltersProps) => {
  return (
    <Card className="col-span-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mes">Mês</Label>
            <Select
              value={filters.mes}
              onValueChange={(value) => setFilters({ ...filters, mes: value })}
            >
              <SelectTrigger id="mes">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="Todos">Todos</SelectItem>
                {availableMeses.map((mes) => (
                  <SelectItem key={mes} value={mes}>
                    {mes}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente</Label>
            <Input
              id="cliente"
              placeholder="Buscar cliente..."
              value={filters.cliente}
              onChange={(e) => setFilters({ ...filters, cliente: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="produto">Produto</Label>
            <Select
              value={filters.produtos.length === 0 ? "Todos" : filters.produtos[0]}
              onValueChange={(value) => 
                setFilters({ ...filters, produtos: value === "Todos" ? [] : [value] })
              }
            >
              <SelectTrigger id="produto">
                <SelectValue placeholder="Selecione o produto" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="Todos">Todos</SelectItem>
                {availableProdutos.map((produto) => (
                  <SelectItem key={produto} value={produto}>
                    {produto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="classe">Classe SR</Label>
            <Select
              value={filters.classesSR.length === 0 ? "Todas" : filters.classesSR[0]}
              onValueChange={(value) => 
                setFilters({ ...filters, classesSR: value === "Todas" ? [] : [value] })
              }
            >
              <SelectTrigger id="classe">
                <SelectValue placeholder="Selecione a classe" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="Todas">Todas</SelectItem>
                {availableClasses.map((classe) => (
                  <SelectItem key={classe} value={classe}>
                    {classe}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
