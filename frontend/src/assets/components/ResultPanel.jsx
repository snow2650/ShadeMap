import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Route, Clock, MapPin, Save, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RoutePanel({ 
  routes, 
  selectedRoute, 
  onSelectRoute, 
  onSaveRoute 
}) {
  const getShadeColor = (shadeLevel) => {
    if (shadeLevel >= 70) return "border-emerald-500 text-emerald-700 bg-emerald-50";
    if (shadeLevel >= 40) return "border-blue-500 text-blue-700 bg-blue-50";
    return "border-orange-500 text-orange-700 bg-orange-50";
  };

  const getShadeIcon = (shadeLevel) => {
    if (shadeLevel >= 70) return "🌳";
    if (shadeLevel >= 40) return "🌤️";
    return "☀️";
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className="mt-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Route className="w-5 h-5 text-emerald-600" />
              Route Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {routes.map((route) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: route.id * 0.1 }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedRoute?.id === route.id
                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
                onClick={() => onSelectRoute(route)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getShadeIcon(route.average_shade)}</span>
                    <h4 className="font-semibold text-slate-900">{route.name}</h4>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getShadeColor(route.average_shade)}
                  >
                    {route.average_shade}% shade
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{route.total_distance} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>{route.estimated_duration} min</span>
                  </div>
                </div>

                {selectedRoute?.id === route.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-emerald-200"
                  >
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSaveRoute(route);
                        }}
                        className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}