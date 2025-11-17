import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  variant?: "default" | "revenue" | "salary";
}

export const KPICard = ({ title, value, description, icon: Icon, variant = "default" }: KPICardProps) => {
  const iconColorClass = 
    variant === "revenue" ? "text-primary" :
    variant === "salary" ? "text-secondary" :
    "text-accent";

  return (
    <Card className="bg-card border-border hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColorClass}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};
