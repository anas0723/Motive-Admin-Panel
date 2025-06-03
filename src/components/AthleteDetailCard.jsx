import { XMarkIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Card from './ui/Card';
import Button from './ui/Button';

function AthleteDetailCard({
  athlete,
  onClose,
  onEdit,
  onDelete,
  show
}) {
  if (!athlete && !show) return null;

  return (
    <div className={`fixed inset-0 bg-gray-800/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl transform transition-all duration-300 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <Card
          variant="elevated"
          header={
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">{athlete?.name}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          }
          footer={
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                icon={PencilSquareIcon}
                onClick={() => onEdit(athlete)}
              >
                Edit
              </Button>
              <Button
                variant="accent"
                icon={TrashIcon}
                onClick={() => onDelete(athlete)}
              >
                Delete
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            {athlete?.profilePicture && (
              <div className="flex justify-center">
                <img
                  src={athlete.profilePicture}
                  alt={`${athlete.name}'s profile`}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-100"
                />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-600">{athlete?.email}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <span className="ml-2 text-gray-600">{athlete?.phone}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Team:</span>
                  <span className="ml-2 text-gray-600">{athlete?.team}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Age:</span>
                  <span className="ml-2 text-gray-600">{athlete?.age}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Sport:</span>
                  <span className="ml-2 text-gray-600">{athlete?.sport}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">School:</span>
                  <span className="ml-2 text-gray-600">{athlete?.school}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Performance Chart</p>
                  <div className="h-32 bg-white/50 rounded border border-indigo-100 flex items-center justify-center">
                    <p className="text-sm text-gray-500">Performance data visualization</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Efficiency Metrics</p>
                  <div className="h-32 bg-white/50 rounded border border-cyan-100 flex items-center justify-center">
                    <p className="text-sm text-gray-500">Efficiency data visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AthleteDetailCard; 