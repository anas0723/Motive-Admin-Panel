import { useState, useRef, useEffect } from 'react';
import Table from '../components/Table';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const initialCoaches = [
  { id: 1, name: 'Sarah Wilson', team: 'Team Alpha', experience: '10 years', specialization: 'Running', school: 'Central High School' },
  { id: 2, name: 'David Brown', team: 'Team Beta', experience: '8 years', specialization: 'Swimming', school: 'Northwood Academy' },
  { id: 3, name: 'Lisa Chen', team: 'Team Alpha', experience: '12 years', specialization: 'Cycling', school: 'Riverside Prep' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'team', label: 'Team' },
  { key: 'experience', label: 'Experience' },
  { key: 'specialization', label: 'Specialization' },
  { key: 'school', label: 'School' },
];

function Coach() {
  const [coaches, setCoaches] = useState(initialCoaches);
  const [editingCoach, setEditingCoach] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    experience: '',
    specialization: '',
    school: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCoach) {
      setCoaches(coaches.map(coach =>
        coach.id === editingCoach.id ? { ...formData, id: coach.id } : coach
      ));
    } else {
      setCoaches([...coaches, { ...formData, id: coaches.length + 1 }]);
    }
    setFormData({ name: '', team: '', experience: '', specialization: '', school: '' });
    setEditingCoach(null);
    setIsFormOpen(false);
  };

  const handleEdit = (coach) => {
    setEditingCoach(coach);
    setFormData({
      name: coach.name,
      team: coach.team,
      experience: coach.experience,
      specialization: coach.specialization,
      school: coach.school,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (coachToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${coachToDelete.name}?`)) {
      setCoaches(coaches.filter(coach => coach.id !== coachToDelete.id));
    }
  };

  const handleAddNewClick = () => {
    setEditingCoach(null);
    setFormData({ name: '', team: '', experience: '', specialization: '', school: '' });
    setIsFormOpen(true);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      const filtered = coaches.filter(coach => 
        coach.name.toLowerCase().includes(query.toLowerCase()) ||
        coach.team.toLowerCase().includes(query.toLowerCase()) ||
        coach.specialization.toLowerCase().includes(query.toLowerCase()) ||
        coach.school.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (coach) => {
    setSearchQuery(`${coach.name} • ${coach.team} • ${coach.specialization} • ${coach.school}`);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Filter coaches based on search query
  const filteredCoaches = coaches.filter(coach => 
    coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Coaches</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all coaches in your organization.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            onClick={handleAddNewClick}
          >
            Add New Coach
          </button>
        </div>
      </div>

      {/* Search Bar with Autocomplete */}
      <div className="relative" ref={searchRef}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          placeholder="Search coaches by name, team, specialization, or school..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
        />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-h-60">
            {suggestions.map((coach) => (
              <div
                key={coach.id}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                onClick={() => handleSuggestionClick(coach)}
              >
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{coach.name}</span>
                  <span className="ml-2 text-gray-500">
                    {coach.team} • {coach.specialization} • {coach.school}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{editingCoach ? 'Edit Coach' : 'Add New Coach'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="team" className="block text-sm font-medium text-gray-700">
                  Team
                </label>
                <input
                  type="text"
                  name="team"
                  id="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  id="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                  School
                </label>
                <input
                  type="text"
                  name="school"
                  id="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {editingCoach ? 'Update Coach' : 'Add Coach'}
              </button>
            </div>
          </form>
        </div>
      )}

      <Table
        columns={columns}
        data={filteredCoaches}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Coach; 