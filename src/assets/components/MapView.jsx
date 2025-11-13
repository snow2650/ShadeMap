import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

// Fix for default markers in React Leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// This component handles map interactions like flying to the selected route
function MapInteractions({ selectedRoute }) {
  const map = useMap();

  useEffect(() => {
    if (selectedRoute && selectedRoute.route_points?.length > 0) {
      const bounds = L.latLngBounds(selectedRoute.route_points.map(p => [p.lat, p.lng]));
      if (bounds.isValid()) {
        map.flyToBounds(bounds, { padding: [50, 50], duration: 1 });
      }
    }
  }, [selectedRoute, map]);

  return null;
}

export default function MapView({ 
  center, 
  routes, 
  selectedRoute, 
  landmarks,
  isCalculating 
}) {
  return (
    <Card className="h-[600px] overflow-hidden shadow-xl border-0 bg-white">
      <div className="relative h-full">
        {isCalculating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-900">Analyzing shade patterns...</p>
              <p className="text-sm text-slate-600">This may take a few moments</p>
            </div>
          </motion.div>
        )}

        <MapContainer
          center={center}
          zoom={12}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Component to handle map view changes */}
          <MapInteractions selectedRoute={selectedRoute} />

          {/* Landmarks */}
          {landmarks.map((landmark, index) => (
            <Marker key={index} position={[landmark.lat, landmark.lng]}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold text-slate-900">{landmark.name}</h3>
                  <p className="text-sm text-slate-600">Vancouver Landmark</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Render non-selected routes first */}
          {routes
            .filter(route => route.id !== selectedRoute?.id)
            .map((route) => (
              <Polyline
                key={route.id}
                positions={route.route_points.map(point => [point.lat, point.lng])}
                color={route.color}
                weight={4}
                opacity={0.65}
              />
          ))}

          {/* Render selected route on top for emphasis */}
          {selectedRoute && (
            <Polyline
              key={`selected-${selectedRoute.id}`}
              positions={selectedRoute.route_points.map(point => [point.lat, point.lng])}
              color={selectedRoute.color}
              weight={7}
              opacity={1}
            />
          )}
        </MapContainer>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h4 className="font-semibold text-slate-900 mb-2 text-sm">Shade Levels</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <span className="text-slate-700">High Shade (70%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-slate-700">Medium Shade (40-70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span className="text-slate-700">Low Shade (under 40%)</span>
            </div>
          </div>
        </div>

        {selectedRoute && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg min-w-[200px]"
          >
            <h4 className="font-semibold text-slate-900 mb-2">{selectedRoute.name}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Shade:</span>
                <Badge 
                  variant="outline" 
                  className={
                    selectedRoute.average_shade >= 70 
                      ? 'border-emerald-500 text-emerald-700' 
                      : selectedRoute.average_shade >= 40 
                      ? 'border-blue-500 text-blue-700' 
                      : 'border-orange-500 text-orange-700'
                  }
                >
                  {selectedRoute.average_shade}%
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Distance:</span>
                <span className="font-medium">{selectedRoute.total_distance} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Time:</span>
                <span className="font-medium">{selectedRoute.estimated_duration} min</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}