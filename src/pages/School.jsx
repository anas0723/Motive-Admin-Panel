import { useState } from 'react';
import { useSchools } from '../context/SchoolsContext';
import SchoolDropdown from '../components/SchoolDropdown';

// Enhanced school data with additional fields
const initialSchools = [
  {
    id: 1,
    name: 'Central High School',
    city: 'Springfield',
    state: 'IL',
    address: '123 Main St, Springfield, IL 62701',
    teams: [
      { id: 1, name: 'Varsity Football', coach: 'John Smith', athletes: 45 },
      { id: 2, name: 'Basketball', coach: 'Sarah Johnson', athletes: 30 },
      { id: 3, name: 'Track & Field', coach: 'Mike Brown', athletes: 60 }
    ],
    coaches: [
      { id: 1, name: 'John Smith', specialization: 'Football', experience: '15 years' },
      { id: 2, name: 'Sarah Johnson', specialization: 'Basketball', experience: '10 years' },
      { id: 3, name: 'Mike Brown', specialization: 'Track & Field', experience: '8 years' }
    ],
    athletes: [
      { id: 1, name: 'James Wilson', grade: '12', sport: 'Football' },
      { id: 2, name: 'Emma Davis', grade: '11', sport: 'Basketball' },
      { id: 3, name: 'Michael Lee', grade: '10', sport: 'Track & Field' }
    ]
  },
  {
    id: 2,
    name: 'Northwood Academy',
    city: 'Oakville',
    state: 'CA',
    address: '456 Oak Ave, Oakville, CA 90210',
    teams: [
      { id: 1, name: 'Swimming', coach: 'Lisa Chen', athletes: 35 },
      { id: 2, name: 'Tennis', coach: 'David Park', athletes: 25 }
    ],
    coaches: [
      { id: 1, name: 'Lisa Chen', specialization: 'Swimming', experience: '12 years' },
      { id: 2, name: 'David Park', specialization: 'Tennis', experience: '9 years' }
    ],
    athletes: [
      { id: 1, name: 'Sophia Martinez', grade: '12', sport: 'Swimming' },
      { id: 2, name: 'Alex Thompson', grade: '11', sport: 'Tennis' }
    ]
  },
  {
    id: 3,
    name: 'Riverside Prep',
    city: 'Maplewood',
    state: 'NY',
    address: '789 River Rd, Maplewood, NY 10001',
    teams: [
      { id: 1, name: 'Soccer', coach: 'Maria Garcia', athletes: 40 },
      { id: 2, name: 'Volleyball', coach: 'Tom Wilson', athletes: 28 }
    ],
    coaches: [
      { id: 1, name: 'Maria Garcia', specialization: 'Soccer', experience: '11 years' },
      { id: 2, name: 'Tom Wilson', specialization: 'Volleyball', experience: '7 years' }
    ],
    athletes: [
      { id: 1, name: 'Daniel Kim', grade: '12', sport: 'Soccer' },
      { id: 2, name: 'Olivia Brown', grade: '11', sport: 'Volleyball' }
    ]
  }
];

function School() {
  const { schools, addSchool, getSchoolById } = useSchools();
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [newSchoolForm, setNewSchoolForm] = useState({
    name: '',
    city: '',
    state: ''
  });

  const handleSchoolChange = (e) => {
    const schoolId = parseInt(e.target.value);
    const school = getSchoolById(schoolId);
    setSelectedSchool(school);
  };

  const handleNewSchoolInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchoolForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewSchoolSubmit = (e) => {
    e.preventDefault();
    addSchool(newSchoolForm);
    setNewSchoolForm({ name: '', city: '', state: '' });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Add School Form Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Add a School</h2>
        <form onSubmit={handleNewSchoolSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                School Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={newSchoolForm.name}
                onChange={handleNewSchoolInputChange}
                className="input-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-800 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={newSchoolForm.city}
                onChange={handleNewSchoolInputChange}
                className="input-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-800 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={newSchoolForm.state}
                onChange={handleNewSchoolInputChange}
                className="input-primary"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add School
            </button>
          </div>
        </form>
      </div>

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Schools</h1>
          <p className="mt-2 text-sm text-gray-700">
            Select a school to view its details.
          </p>
        </div>
      </div>

      {/* School Selection Dropdown */}
      <SchoolDropdown
        value={selectedSchool?.id}
        onChange={handleSchoolChange}
        label="Select School"
        className="max-w-md"
      />

      {/* School Details Section */}
      {selectedSchool && (
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedSchool.name}</h2>
            <p className="text-gray-600 mb-6">{selectedSchool.city}, {selectedSchool.state}</p>

            {/* Teams Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Teams</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedSchool.teams.map((team) => (
                  <div key={team.id} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">{team.name}</h4>
                    <p className="text-sm text-gray-600">Coach: {team.coach}</p>
                    <p className="text-sm text-gray-600">Athletes: {team.athletes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coaches Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Coaches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedSchool.coaches.map((coach) => (
                  <div key={coach.id} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">{coach.name}</h4>
                    <p className="text-sm text-gray-600">Specialization: {coach.specialization}</p>
                    <p className="text-sm text-gray-600">Experience: {coach.experience}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Athletes Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Athletes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedSchool.athletes.map((athlete) => (
                  <div key={athlete.id} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">{athlete.name}</h4>
                    <p className="text-sm text-gray-600">Grade: {athlete.grade}</p>
                    <p className="text-sm text-gray-600">Sport: {athlete.sport}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default School; 