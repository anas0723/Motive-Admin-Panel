import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function Table({ columns, data, onEdit, onDelete, onRowClick, onViewDetails, selectedRow, hideActions }) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 sm:rounded-2xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-900 to-gray-800">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                    >
                      {column.label}
                    </th>
                  ))}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-gray-50 transition-all duration-200 ${
                      selectedRow?.id === item.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    {columns.map((column, colIdx) => (
                      <td
                        key={column.key}
                        className={`whitespace-nowrap py-4 ${
                          colIdx === 0 ? 'pl-4 sm:pl-6' : 'pl-4'
                        } pr-3 text-sm font-medium text-gray-900`}
                      >
                        {column.key === 'profilePicture' ? (
                          <div className="flex items-center">
                            <img
                              src={item.profilePicture}
                              alt={`${item.name}'s profile`}
                              className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-100"
                            />
                          </div>
                        ) : (
                          <span className="truncate block max-w-xs">{item[column.key]}</span>
                        )}
                      </td>
                    ))}
                    <td className="whitespace-nowrap py-4 pl-4 pr-6 text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(item);
                          }}
                          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          View Details
                        </button>
                        {!hideActions && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(item);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;