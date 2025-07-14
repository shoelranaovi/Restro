import { Award, DollarSign, TrendingUp, Users } from "lucide-react";

function StatisticsCard({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Users</p>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>
          <Users className="w-8 h-8 text-blue-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-medium">Active Users</p>
            <p className="text-2xl font-bold">{stats?.activeUsers}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-emerald-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
            <p className="text-2xl font-bold">
              ${stats?.totalRevenue?.toFixed(0)}
            </p>
          </div>
          <DollarSign className="w-8 h-8 text-purple-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium">
              Avg Order Value
            </p>
            <p className="text-2xl font-bold">
              ${stats?.avgOrderValue.toFixed(0)}
            </p>
          </div>
          <Award className="w-8 h-8 text-amber-200" />
        </div>
      </div>
    </div>
  );
}

export default StatisticsCard;
