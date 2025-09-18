

function Report({getStatusIcon,getStatusColor}) {
    const reports = [
        { id: '001', date: '2024-07-02', type: 'Order Issue', description: 'Food was cold when delivered', status: 'Resolved' },
        { id: '002', date: '2024-06-28', type: 'Service Complaint', description: 'Long wait time for reservation', status: 'Under Review' }
      ];
  return (
    <div className="p-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-8">Reports & Issues</h3>
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{report.type}</h4>
              <p className="text-gray-600">{report.date}</p>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
              {getStatusIcon(report.status)}
              {report.status}
            </div>
          </div>
          <p className="text-gray-700">{report.description}</p>
        </div>
      ))}
    </div>
    <div className="mt-8">
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors">
        Submit New Report
      </button>
    </div>
  </div>
  )
}

export default Report