

function TopTables() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {/* Top Products */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Top Products
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Product A", sales: 1245, change: "+12%" },
                  { name: "Product B", sales: 987, change: "+8%" },
                  { name: "Product C", sales: 756, change: "+15%" },
                  { name: "Product D", sales: 654, change: "+3%" },
                  { name: "Product E", sales: 543, change: "+7%" },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-1 border-gray-200"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.sales} sales
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {product.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    action: "New order received",
                    time: "2 minutes ago",
                    type: "order",
                  },
                  {
                    action: "Customer registered",
                    time: "15 minutes ago",
                    type: "user",
                  },
                  {
                    action: "Payment processed",
                    time: "32 minutes ago",
                    type: "payment",
                  },
                  {
                    action: "Product updated",
                    time: "1 hour ago",
                    type: "product",
                  },
                  {
                    action: "Report generated",
                    time: "2 hours ago",
                    type: "report",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">
                        {activity.action}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Performance</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { metric: "Page Load Time", value: "1.2s", status: "good" },
                  { metric: "Bounce Rate", value: "34%", status: "good" },
                  {
                    metric: "Session Duration",
                    value: "4m 32s",
                    status: "excellent",
                  },
                  { metric: "Error Rate", value: "0.1%", status: "excellent" },
                  { metric: "API Response", value: "145ms", status: "good" },
                ].map((perf, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="text-sm text-gray-900">{perf.metric}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {perf.value}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          perf.status === "excellent"
                            ? "bg-green-500"
                            : perf.status === "good"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  )
}

export default TopTables