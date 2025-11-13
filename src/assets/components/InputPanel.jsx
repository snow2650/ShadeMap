import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Calendar, Activity, Navigation, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function InputPanel({
  startLocation,
  setStartLocation,
  endLocation,
  setEndLocation,
  selectedTime,
  setSelectedTime,
  selectedDate,
  setSelectedDate,
  activityType,
  setActivityType,
  onCalculate,
  isCalculating,
  landmarks
}) {
  const [showStartSuggestions, setShowStartSuggestions] = useState(false);
  const [showEndSuggestions, setShowEndSuggestions] = useState(false);

  const filteredStartLandmarks = landmarks.filter(landmark => 
    landmark.name.toLowerCase().includes(startLocation.toLowerCase())
  );

  const filteredEndLandmarks = landmarks.filter(landmark => 
    landmark.name.toLowerCase().includes(endLocation.toLowerCase())
  );

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Navigation className="w-5 h-5 text-emerald-600" />
          Plan Your Route
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Inputs */}
        <div className="space-y-4">
          <div className="relative">
            <Label htmlFor="start" className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Starting Point
            </Label>
            <Input
              id="start"
              placeholder="Enter starting location..."
              value={startLocation}
              onChange={(e) => {
                setStartLocation(e.target.value);
                setShowStartSuggestions(e.target.value.length > 0);
              }}
              className="bg-white border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
            {showStartSuggestions && filteredStartLandmarks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg"
              >
                {filteredStartLandmarks.map((landmark) => (
                  <button
                    key={landmark.name}
                    className="w-full px-3 py-2 text-left hover:bg-emerald-50 text-sm first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      setStartLocation(landmark.name);
                      setShowStartSuggestions(false);
                    }}
                  >
                    {landmark.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <div className="relative">
            <Label htmlFor="end" className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-red-500" />
              Destination
            </Label>
            <Input
              id="end"
              placeholder="Enter destination..."
              value={endLocation}
              onChange={(e) => {
                setEndLocation(e.target.value);
                setShowEndSuggestions(e.target.value.length > 0);
              }}
              className="bg-white border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
            {showEndSuggestions && filteredEndLandmarks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg"
              >
                {filteredEndLandmarks.map((landmark) => (
                  <button
                    key={landmark.name}
                    className="w-full px-3 py-2 text-left hover:bg-emerald-50 text-sm first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      setEndLocation(landmark.name);
                      setShowEndSuggestions(false);
                    }}
                  >
                    {landmark.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Time and Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="time" className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="bg-white border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <Label htmlFor="date" className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-white border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Activity Type */}
        <div>
          <Label className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-orange-600" />
            Activity
          </Label>
          <Select value={activityType} onValueChange={setActivityType}>
            <SelectTrigger className="bg-white border-slate-200 focus:border-emerald-500 focus:ring-emerald-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="walking">🚶 Walking</SelectItem>
              <SelectItem value="cycling">🚴 Cycling</SelectItem>
              <SelectItem value="running">🏃 Running</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={onCalculate}
          disabled={!startLocation || !endLocation || isCalculating}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isCalculating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculating Shade Routes...
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 mr-2" />
              Find Shade Routes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}