import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { DeliveryOrder } from '../types';
import { MapPin, Navigation, Truck, CheckCircle2, ShieldCheck } from 'lucide-react';

interface TrackingMapProps {
  order: DeliveryOrder;
}

export const TrackingMap: React.FC<TrackingMapProps> = ({ order }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapError, setMapError] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'route-steps'>('map');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      // Cleanup previous map if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const pickupCoord: [number, number] = [order.pickup.lat, order.pickup.lng];
      const dropCoord: [number, number] = [order.destination.lat, order.destination.lng];
      
      const riderCoord: [number, number] = order.currentLocation
        ? [order.currentLocation.lat, order.currentLocation.lng]
        : [(pickupCoord[0] + dropCoord[0]) / 2, (pickupCoord[1] + dropCoord[1]) / 2];

      const centerCoord: [number, number] = [
        (pickupCoord[0] + dropCoord[0]) / 2,
        (pickupCoord[1] + dropCoord[1]) / 2,
      ];

      const map = L.map(mapContainerRef.current, {
        center: centerCoord,
        zoom: 9,
        zoomControl: true,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      // Custom markers with clean styling
      const pickupIcon = L.divIcon({
        className: 'custom-pin-pickup',
        html: `
          <div style="background-color: #15803d; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); border: 2px solid white; font-size: 14px;">
            🌾
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const dropIcon = L.divIcon({
        className: 'custom-pin-drop',
        html: `
          <div style="background-color: #1e3a8a; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); border: 2px solid white; font-size: 14px;">
            📍
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const riderIcon = L.divIcon({
        className: 'custom-pin-rider',
        html: `
          <div style="background-color: #047857; color: white; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.3), 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; font-size: 18px;">
            🛵
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      // Markers
      L.marker(pickupCoord, { icon: pickupIcon })
        .addTo(map)
        .bindPopup(`<b>Pickup:</b> ${order.pickup.title}<br/>${order.pickup.village}, ${order.pickup.taluka}`);

      L.marker(dropCoord, { icon: dropIcon })
        .addTo(map)
        .bindPopup(`<b>Destination:</b> ${order.destination.title}<br/>${order.destination.address}`);

      if (order.status === 'IN_TRANSIT' || order.status === 'OUT_FOR_DELIVERY') {
        L.marker(riderCoord, { icon: riderIcon })
          .addTo(map)
          .bindPopup(`<b>Driver: ${order.partnerName || 'Sachin Shinde'}</b><br/>${order.partnerVehicle || 'EV Scooter'}<br/>Live Location`);
      }

      // Route polyline with midpoint bend for realistic road simulation
      const midStep: [number, number] = [
        pickupCoord[0] * 0.4 + dropCoord[0] * 0.6 + 0.05,
        pickupCoord[1] * 0.4 + dropCoord[1] * 0.6 - 0.04,
      ];

      const polylinePoints: [number, number][] = [pickupCoord, midStep, dropCoord];
      
      const polyline = L.polyline(polylinePoints, {
        color: '#15803d',
        weight: 4,
        opacity: 0.85,
        dashArray: order.status === 'DELIVERED' ? undefined : '6, 6',
      }).addTo(map);

      // Fit bounds
      const bounds = L.latLngBounds(polylinePoints);
      map.fitBounds(bounds, { padding: [40, 40] });

    } catch (err) {
      console.error('Leaflet map initialization failed:', err);
      setMapError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [order]);

  return (
    <div className="space-y-4">
      {/* View Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'map'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Live Geographical Map
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('route-steps')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'route-steps'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            Rural Transit Waypoints
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Route: {order.pickup.village} ➔ {order.destination.village} ({order.distanceKm} km)
        </div>
      </div>

      {activeTab === 'map' ? (
        <div className="relative w-full h-[340px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
          <div ref={mapContainerRef} className="w-full h-full" />
          
          {/* Map Overlay Badge */}
          <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-medium text-slate-800">
              {order.status === 'DELIVERED'
                ? 'Delivered'
                : order.status === 'IN_TRANSIT'
                ? 'Driver On Route: State Highway 10'
                : 'Scheduled for Dispatch'}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200 shadow-sm text-xs space-y-1">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-emerald-700 font-bold">🌾 Origin:</span>
              <span>{order.pickup.village}, Taluka {order.pickup.taluka}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-blue-700 font-bold">📍 Destination:</span>
              <span>{order.destination.village}, {order.destination.district}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Visual Waypoint Corridor Diagram */
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Rural Last-Mile Corridor Transit Nodes (Maharashtra Zone 4)
          </div>

          <div className="relative border-l-2 border-emerald-300 ml-4 pl-6 space-y-6">
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow"></div>
              <div className="text-sm font-semibold text-slate-900">{order.pickup.title}</div>
              <div className="text-xs text-slate-500">{order.pickup.address}, {order.pickup.village}</div>
              <div className="text-xs text-emerald-700 mt-0.5">Origin Village Farm / SHG Workshop</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow"></div>
              <div className="text-sm font-semibold text-slate-900">Baramati / Khandala Taluka Micro-Hub</div>
              <div className="text-xs text-slate-500">Parcel batching and weight verification scan</div>
              <div className="text-xs text-slate-600 mt-0.5">Milk-run route consolidation saving 35% costs</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow"></div>
              <div className="text-sm font-semibold text-slate-900">Purandar-Saswad Connecting Road</div>
              <div className="text-xs text-slate-500">Electric 2-wheeler rural transit corridor</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-700 border-2 border-white shadow"></div>
              <div className="text-sm font-semibold text-slate-900">{order.destination.title}</div>
              <div className="text-xs text-slate-500">{order.destination.address}, {order.destination.village}</div>
              <div className="text-xs text-blue-700 mt-0.5">Final Doorstep Destination</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
