import { XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function PersonDetailModal({ person, show, onClose, onEdit, onDelete }) {
  if (!person || !show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl transform transition-all duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-sm text-gray-700 space-y-3">
          {/* Profile Picture */}
          {person.profilePicture && (
            <div className="flex justify-center mb-4">
              <img
                src={person.profilePicture}
                alt={`${person.name}'s profile`}
                className="w-24 h-24 rounded-full object-cover ring-2 ring-indigo-100"
              />
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong className="font-semibold">Email:</strong> {person.email}</p>
              <p><strong className="font-semibold">Phone:</strong> {person.phone}</p>
              <p><strong className="font-semibold">Address:</strong> {person.address}</p>
            </div>
            <div className="space-y-2">
              <p><strong className="font-semibold">Date of Birth:</strong> {person.dob}</p>
              <p><strong className="font-semibold">Sport:</strong> {person.sport}</p>
              <p><strong className="font-semibold">School:</strong> {person.school}</p>
            </div>
          </div>

          {/* Additional Info */}
          {person.team && (
            <div className="pt-4 border-t border-gray-200 mt-4">
              <p><strong className="font-semibold">Team:</strong> {person.team}</p>
            </div>
          )}

          {/* Performance Metrics (if available) */}
          {person.performance && (
            <div className="pt-4 border-t border-gray-200 mt-4">
              <p className="font-bold text-gray-900 mb-2">Performance Metrics</p>
              <div className="bg-gray-50 p-3 rounded-md">
                {Object.entries(person.performance).map(([key, value]) => (
                  <p key={key} className="text-sm text-gray-600">
                    <strong className="font-semibold">{key}:</strong> {value}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => onEdit(person)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PencilSquareIcon className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => onDelete(person)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonDetailModal; 