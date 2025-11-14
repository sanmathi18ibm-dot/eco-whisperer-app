import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  gradient: string;
  potentialSaving: number;
}

const MetricCard = ({ title, value, unit, icon: Icon, gradient, potentialSaving }: MetricCardProps) => {
  return (
    <Card className="border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-eco)] transition-all duration-300 overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${gradient}`} />
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <div className="text-3xl font-bold text-foreground">
              {value}
              <span className="text-lg text-muted-foreground ml-1">{unit}</span>
            </div>
          </div>
          {potentialSaving > 0 && (
            <div className="text-sm text-muted-foreground">
              Potential saving: <span className="text-success font-semibold">{potentialSaving} {unit}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
