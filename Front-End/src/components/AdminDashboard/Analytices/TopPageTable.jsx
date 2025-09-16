import React from 'react'

function TopPageTable() {
    const topPages = [
        { page: "/dashboard", views: 12400, bounce: "32%", time: "4:12" },
        { page: "/products", views: 8900, bounce: "28%", time: "5:45" },
        { page: "/checkout", views: 4200, bounce: "45%", time: "2:18" },
        { page: "/profile", views: 3100, bounce: "38%", time: "3:24" },
      ];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900">Top Pages</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Page
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Views
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Bounce Rate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Avg Time
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {topPages.map((page, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-900">
                  {page.page}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-900">
                  {page.views.toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    parseFloat(page.bounce) > 40
                      ? "bg-red-100 text-red-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {page.bounce}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-900">{page.time}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default TopPageTable