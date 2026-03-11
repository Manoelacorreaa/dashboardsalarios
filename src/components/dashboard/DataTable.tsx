import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RowData } from "@/types/dashboard";
import { formatCurrency, formatPercent } from "@/utils/formatters";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableProps {
  data: RowData[];
}

const parseValue = (val: any): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const cleaned = String(val)
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();
  return parseFloat(cleaned) || 0;
};

type SortKey = "Month" | "Cliente" | "Produto" | "Classe SR" | "Volume" | "Receita" | "Salário Mapeado" | "Fee bruto" | "Repasse produto";
type SortOrder = "asc" | "desc";

export const DataTable = ({ data }: DataTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>("Receita");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    const aNum = parseValue(aVal);
    const bNum = parseValue(bVal);

    if (typeof aVal === "string" && typeof bVal === "string" && isNaN(aNum) && isNaN(bNum)) {
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
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
          {data.length} registros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto max-h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><SortButton column="Month" label="Mês" /></TableHead>
                <TableHead><SortButton column="Cliente" label="Cliente" /></TableHead>
                <TableHead><SortButton column="Produto" label="Produto" /></TableHead>
                <TableHead><SortButton column="Classe SR" label="Classe SR" /></TableHead>
                <TableHead className="text-right"><SortButton column="Volume" label="Volume" /></TableHead>
                <TableHead className="text-right"><SortButton column="Receita" label="Receita" /></TableHead>
                <TableHead className="text-right"><SortButton column="Salário Mapeado" label="Salário" /></TableHead>
                <TableHead className="text-right"><SortButton column="Fee bruto" label="Fee" /></TableHead>
                <TableHead className="text-right"><SortButton column="Repasse produto" label="Repasse" /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((record, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{record.Month}</TableCell>
                  <TableCell>{record.Cliente}</TableCell>
                  <TableCell>{record.Produto}</TableCell>
                  <TableCell>{record["Classe SR"]}</TableCell>
                  <TableCell className="text-right">{formatCurrency(parseValue(record.Volume))}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {formatCurrency(parseValue(record.Receita))}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-secondary">
                    {formatCurrency(parseValue(record["Salário Mapeado"]))}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatPercent(parseValue(record["Fee bruto"]))}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatPercent(parseValue(record["Repasse produto"]))}
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
