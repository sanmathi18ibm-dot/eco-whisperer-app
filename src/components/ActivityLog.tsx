import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity } from "@/pages/Index";
import { Plus, Droplets, Zap, Clock } from "lucide-react";
import { toast } from "sonner";

interface ActivityLogProps {
  activities: Activity[];
  onAddActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
}

const activityTypes = {
  water: [
    { value: "shower", label: "Shower", icon: Droplets, avgDuration: 40 },
    { value: "bath", label: "Bath", icon: Droplets, avgDuration: 80 },
    { value: "dishwasher", label: "Dishwasher", icon: Droplets, avgDuration: 15 },
    { value: "laundry", label: "Laundry", icon: Droplets, avgDuration: 50 },
    { value: "garden", label: "Garden Watering", icon: Droplets, avgDuration: 30 },
  ],
  energy: [
    { value: "hvac", label: "Heating/Cooling", icon: Zap, avgDuration: 2 },
    { value: "lighting", label: "Lighting", icon: Zap, avgDuration: 0.5 },
    { value: "cooking", label: "Cooking", icon: Zap, avgDuration: 1.5 },
    { value: "tv", label: "TV/Entertainment", icon: Zap, avgDuration: 0.3 },
    { value: "computer", label: "Computer", icon: Zap, avgDuration: 0.4 },
  ],
};

const ActivityLog = ({ activities, onAddActivity }: ActivityLogProps) => {
  const [category, setCategory] = useState<"water" | "energy">("water");
  const [activityType, setActivityType] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activityType || !duration) {
      toast.error("Please fill in all fields");
      return;
    }

    const durationNum = parseFloat(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      toast.error("Please enter a valid duration");
      return;
    }

    onAddActivity({
      type: activityType,
      duration: durationNum,
      category,
    });

    toast.success("Activity logged successfully!");
    setActivityType("");
    setDuration("");
  };

  const selectedActivityInfo = [...activityTypes.water, ...activityTypes.energy].find(
    (a) => a.value === activityType
  );

  return (
    <Card className="border-border shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Log Activity
        </CardTitle>
        <CardDescription>Track your daily water and energy usage</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as "water" | "energy")}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="water">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-water" />
                      Water
                    </div>
                  </SelectItem>
                  <SelectItem value="energy">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-energy" />
                      Energy
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Activity Type */}
            <div className="space-y-2">
              <Label htmlFor="activity">Activity</Label>
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes[category].map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <SelectItem key={activity.value} value={activity.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {activity.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">
                {category === "water" ? "Liters" : "kWh"}
              </Label>
              <Input
                id="duration"
                type="number"
                step="0.1"
                placeholder={selectedActivityInfo?.avgDuration.toString() || "0"}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Log Activity
          </Button>
        </form>

        {/* Recent Activities */}
        {activities.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground">Recent Activities</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {activities.slice(0, 10).map((activity) => {
                const activityInfo = [...activityTypes.water, ...activityTypes.energy].find(
                  (a) => a.value === activity.type
                );
                const Icon = activityInfo?.icon || Clock;
                const color = activity.category === "water" ? "text-water" : "text-energy";

                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${color}`} />
                      <div>
                        <div className="font-medium text-sm">
                          {activityInfo?.label || activity.type}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">
                      {activity.duration} {activity.category === "water" ? "L" : "kWh"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
