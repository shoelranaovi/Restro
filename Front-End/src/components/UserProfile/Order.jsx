

function Order({getStatusIcon,orders,getStatusColor}) {
  return (
    <div className="p-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h3>
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Order #{order.id}</h4>
              <p className="text-gray-600">{order.date}</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status}
              </div>
              <p className="text-lg font-bold text-gray-900 mt-2">{order.total}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {order.items.map((item, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Order