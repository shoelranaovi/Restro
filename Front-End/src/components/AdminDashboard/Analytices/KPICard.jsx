import { TrendingDown, TrendingUp } from "lucide-react";

export const KPICard = ({ title, value, change, isUp, icon: Icon, color }) => {
    const colors = {
      emerald: "from-emerald-500 to-emerald-600",
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
    };

    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center mt-2">
              {isUp ? (
                <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span
                className={`text-xs font-medium ${
                  isUp ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {change}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-r ${colors[color]}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    );
  };