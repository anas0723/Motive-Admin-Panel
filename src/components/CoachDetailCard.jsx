import { XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function CoachDetailCard({
  coach,
  onClose,
  onEdit,
  onDelete,
  show
}) {
  if (!coach && !show) return null;

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-xl transform transition-all duration-300 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">{coach?.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="p-6 text-sm text-gray-700 space-y-3">
          {coach?.profilePicture && (
            <div className="flex justify-center mb-4">
              <img src={coach.profilePicture} alt={`${coach.name}'s profile`} className="w-24 h-24 rounded-full object-cover" />
            </div>
          )}
          <p><strong className="font-semibold">Email:</strong> {coach?.email}</p>
          <p><strong className="font-semibold">Phone:</strong> {coach?.phone}</p>
          <p><strong className="font-semibold">Team:</strong> {coach?.teamName}</p>
          <p><strong className="font-semibold">Experience:</strong> {coach?.experience}</p>
          <p><strong className="font-semibold">Specialization:</strong> {coach?.specialization}</p>
          <p><strong className="font-semibold">School:</strong> {coach?.school}</p>

          {/* Placeholders for additional info */}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <p className="font-bold text-gray-900 mb-2">Additional Information:</p>
             <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
               <p>Member count: [Placeholder for member count]</p>
            </div>
             <div className="bg-gray-50 p-3 rounded-md mt-2 text-sm text-gray-600">
              <p>Efficiency event: [Placeholder for efficiency data]</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => onEdit(coach)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PencilSquareIcon className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => onDelete(coach)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>  
      </div>
    </div>
  );
}

export default CoachDetailCard; 