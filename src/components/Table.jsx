import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function Table({ columns, data, onEdit, onDelete, onRowClick, selectedRow, hideActions }) {
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
                  {!hideActions && (
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
                      selectedRow?.id === item.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      >
                        {item[column.key]}
                      </td>
                    ))}
                    {!hideActions && (
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {/* <div className="flex justify-end space-x-2">
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
                        </div> */}
                      </td>
                    )}
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