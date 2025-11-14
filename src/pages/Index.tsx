import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, Zap, TrendingDown, Lightbulb } from "lucide-react";
import ActivityLog from "@/components/ActivityLog";
import EcoTips from "@/components/EcoTips";
import MetricCard from "@/components/MetricCard";

export interface Activity {
  id: string;
  type: string;
  duration: number;
  timestamp: Date;
  category: "water" | "energy";
}

const Index = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (activity: Omit<Activity, "id" | "timestamp">) => {
    const newActivity: Activity = {
      ...activity,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setActivities([newActivity, ...activities]);
  };

  // Calculate totals
  const waterUsed = activities
    .filter((a) => a.category === "water")
    .reduce((sum, a) => sum + a.duration, 0);
  
  const energyUsed = activities
    .filter((a) => a.category === "energy")
    .reduce((sum, a) => sum + a.duration, 0);

  const potentialSavings = {
    water: Math.round(waterUsed * 0.2), // 20% potential savings
    energy: Math.round(energyUsed * 0.15), // 15% potential savings
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Eco Helper</h1>
              <p className="text-sm text-muted-foreground">Track & reduce your environmental impact</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Metrics Dashboard */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-primary" />
            Your Impact Today
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <MetricCard
              title="Water Usage"
              value={waterUsed}
              unit="liters"
              icon={Droplets}
              gradient="from-water to-accent"
              potentialSaving={potentialSavings.water}
            />
            <MetricCard
              title="Energy Usage"
              value={energyUsed}
              unit="kWh"
              icon={Zap}
              gradient="from-energy to-primary"
              potentialSaving={potentialSavings.energy}
            />
            <Card className="border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-eco)] transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-success" />
                  Activities Logged
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{activities.length}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activities.length > 0 ? "Great tracking!" : "Start logging activities"}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Activity Log */}
        <section>
          <ActivityLog activities={activities} onAddActivity={addActivity} />
        </section>

        {/* Eco Tips */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-energy" />
            Personalized Tips
          </h2>
          <EcoTips activities={activities} />
        </section>
      </main>
    </div>
  );
};

export default Index;
