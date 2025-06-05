import { XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function AthleteDetailCard({
  athlete,
  onClose,
  onEdit,
  onDelete,
  show
}) {
  if (!athlete && !show) return null;

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-xl transform transition-all duration-300 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">{athlete?.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="p-6 text-sm text-gray-700 space-y-3">
          {athlete?.profilePicture && (
            <div className="flex justify-center mb-4">
              <img src={athlete.profilePicture} alt={`${athlete.name}'s profile`} className="w-24 h-24 rounded-full object-cover" />
            </div>
          )}
          <p><strong className="font-semibold">Email:</strong> {athlete?.email}</p>
          <p><strong className="font-semibold">Phone:</strong> {athlete?.phone}</p>
          <p><strong className="font-semibold">Age:</strong> {athlete?.age}</p>
          <p><strong className="font-semibold">Team:</strong> {athlete?.team}</p>
          <p><strong className="font-semibold">Sport:</strong> {athlete?.sport}</p>
          <p><strong className="font-semibold">School:</strong> {athlete?.school}</p>

          {/* Performance Metrics Section */}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <p className="font-bold text-gray-900 mb-2">Performance Metrics</p>
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
              <p>Recent Performance: [Placeholder for performance data]</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md mt-2 text-sm text-gray-600">
              <p>Training Progress: [Placeholder for progress data]</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={() => onEdit(athlete)}
          >
            <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Edit
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={() => onDelete(athlete)}
          >
            <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default AthleteDetailCard;