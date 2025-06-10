import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

function PersonCard({ person, onViewDetails }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
      <div className="flex items-start space-x-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          {person.profilePicture ? (
            <img
              src={person.profilePicture}
              alt={`${person.name}'s profile`}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-100"
            />
          ) : (
            <UserCircleIcon className="w-16 h-16 text-gray-300" />
          )}
        </div>  

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{person.name}</h3>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600 truncate">
              <span className="font-medium">Email:</span> {person.email}
            </p>
            <p className="text-sm text-gray-600 truncate">
              <span className="font-medium">Sport:</span> {person.sport || person.specialization}
            </p>
            <p className="text-sm text-gray-600 truncate">
              <span className="font-medium">School:</span> {person.school}
            </p>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onViewDetails(person)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default PersonCard; 