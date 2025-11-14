import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "@/pages/Index";
import { Lightbulb, Droplets, Zap, TrendingDown, Sparkles } from "lucide-react";

interface EcoTipsProps {
  activities: Activity[];
}

interface Tip {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "water" | "energy" | "general";
}

const allTips: Tip[] = [
  {
    title: "Shorter Showers",
    description: "Reduce shower time by 2 minutes to save up to 10 liters of water per shower.",
    impact: "high",
    category: "water",
  },
  {
    title: "Cold Water Laundry",
    description: "Washing clothes in cold water can reduce energy use by up to 90% per load.",
    impact: "high",
    category: "energy",
  },
  {
    title: "LED Light Bulbs",
    description: "Switch to LED bulbs to use 75% less energy and last 25 times longer.",
    impact: "medium",
    category: "energy",
  },
  {
    title: "Fix Leaky Faucets",
    description: "A dripping faucet can waste up to 15 liters of water per day.",
    impact: "high",
    category: "water",
  },
  {
    title: "Unplug Devices",
    description: "Unplug chargers and devices when not in use to prevent phantom energy drain.",
    impact: "medium",
    category: "energy",
  },
  {
    title: "Full Loads Only",
    description: "Only run dishwashers and washing machines with full loads to maximize efficiency.",
    impact: "medium",
    category: "water",
  },
  {
    title: "Smart Thermostat",
    description: "Program your thermostat to reduce heating/cooling when you're away.",
    impact: "high",
    category: "energy",
  },
  {
    title: "Low-Flow Fixtures",
    description: "Install low-flow showerheads and faucets to reduce water use by 30-50%.",
    impact: "high",
    category: "water",
  },
];

const EcoTips = ({ activities }: EcoTipsProps) => {
  // Analyze activities to provide personalized tips
  const waterActivities = activities.filter((a) => a.category === "water");
  const energyActivities = activities.filter((a) => a.category === "energy");
  
  const hasShowers = waterActivities.some((a) => a.type === "shower");
  const hasEnergy = energyActivities.length > 0;
  const hasWater = waterActivities.length > 0;

  // Personalize tip selection
  let relevantTips = [...allTips];
  
  if (hasShowers) {
    // Prioritize shower-related tips
    relevantTips = relevantTips.sort((a, b) => {
      if (a.title === "Shorter Showers") return -1;
      if (b.title === "Shorter Showers") return 1;
      return 0;
    });
  }

  if (hasWater && !hasEnergy) {
    // Show more water tips
    relevantTips = relevantTips.filter((t) => t.category === "water" || t.category === "general");
  } else if (hasEnergy && !hasWater) {
    // Show more energy tips
    relevantTips = relevantTips.filter((t) => t.category === "energy" || t.category === "general");
  }

  const displayTips = relevantTips.slice(0, 6);

  const impactColors = {
    high: "bg-success/10 text-success border-success/20",
    medium: "bg-energy/10 text-energy border-energy/20",
    low: "bg-muted text-muted-foreground border-border",
  };

  const categoryIcons = {
    water: Droplets,
    energy: Zap,
    general: Sparkles,
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayTips.map((tip, index) => {
        const Icon = categoryIcons[tip.category];
        return (
          <Card
            key={index}
            className="border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-eco)] transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <Badge className={impactColors[tip.impact]} variant="outline">
                  {tip.impact} impact
                </Badge>
              </div>
              <CardTitle className="text-base">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {tip.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EcoTips;
