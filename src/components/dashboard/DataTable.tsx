import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataRecord } from "@/types/dashboard";
import { formatCurrency, formatPercent } from "@/utils/formatters";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableProps {
  data: DataRecord[];
}

type SortKey = keyof DataRecord;
type SortOrder = "asc" | "desc";

export const DataTable = ({ data }: DataTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>("receitaBRL");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }
    
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortOrder === "asc" 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal);
    }
    
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const SortButton = ({ column, label }: { column: SortKey; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(column)}
      className="h-8 text-xs font-medium"
    >
      {label}
      <ArrowUpDown className="ml-1 h-3 w-3" />
    </Button>
  );

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Registros Detalhados</CardTitle>
        <CardDescription>
          Apenas operações boletadas • {data.length} registros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto max-h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><SortButton column="mes" label="Mês" /></TableHead>
                <TableHead><SortButton column="cliente" label="Cliente" /></TableHead>
                <TableHead><SortButton column="produto" label="Produto" /></TableHead>
                <TableHead><SortButton column="classeSR" label="Classe SR" /></TableHead>
                <TableHead className="text-right"><SortButton column="volumeBRL" label="Volume" /></TableHead>
                <TableHead className="text-right"><SortButton column="receitaBRL" label="Receita" /></TableHead>
                <TableHead className="text-right"><SortButton column="salarioBRL" label="Salário" /></TableHead>
                <TableHead className="text-right"><SortButton column="feeBrutoPercent" label="Fee" /></TableHead>
                <TableHead className="text-right"><SortButton column="repasseProdutoPercent" label="Repasse" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((record, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{record.mes}</TableCell>
                  <TableCell>{record.cliente}</TableCell>
                  <TableCell>{record.produto}</TableCell>
                  <TableCell>{record.classeSR}</TableCell>
                  <TableCell className="text-right">{formatCurrency(record.volumeBRL)}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {formatCurrency(record.receitaBRL)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-secondary">
                    {formatCurrency(record.salarioBRL)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatPercent(record.feeBrutoPercent)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatPercent(record.repasseProdutoPercent)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
