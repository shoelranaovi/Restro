

import { Eye, Clock, Zap, Activity } from "lucide-react";

export const QuickStats = ({isLive}) => {


  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Live Visitors</p>
            <p className="text-2xl font-bold">
              {isLive ? Math.floor(Math.random() * 50) + 150 : "187"}
            </p>
          </div>
          <Activity className="h-6 w-6 opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Avg. Speed</p>
            <p className="text-2xl font-bold">2.1s</p>
          </div>
          <Zap className="h-6 w-6 opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Session Time</p>
            <p className="text-2xl font-bold">4:32</p>
          </div>
          <Clock className="h-6 w-6 opacity-80" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Page Views</p>
            <p className="text-2xl font-bold">23.4K</p>
          </div>
          <Eye className="h-6 w-6 opacity-80" />
        </div>
      </div>
    </div>
  );
};
