import { useState, useRef, useEffect } from 'react';
import Table from '../components/Table';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import CoachDetailCard from '../components/CoachDetailCard';
import { initialTeams } from './Team'; // Import initialTeams
import SchoolSelect from '../components/SchoolSelect';
import SchoolDropdown from '../components/SchoolDropdown';

const initialCoaches = [
  { id: 1, name: 'Sarah Wilson', teamName: 'Team Alpha', experience: '10 years', specialization: 'Running', school: 'Central High School' },
  { id: 2, name: 'David Brown', teamName: 'Team Beta', experience: '8 years', specialization: 'Swimming', school: 'Northwood Academy' },
  { id: 3, name: 'Lisa Chen', teamName: 'Team Alpha', experience: '12 years', specialization: 'Cycling', school: 'Riverside Prep' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'teamName', label: 'Team' }, // Use teamName for the column
  { key: 'experience', label: 'Experience' },
  { key: 'specialization', label: 'Specialization' },
  { key: 'school', label: 'School' },
  { key: 'actions', label: 'Actions' },
];

function Coach() {
  const [coaches, setCoaches] = useState(initialCoaches);
  const [editingCoach, setEditingCoach] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    teamName: '',
    experience: '',
    specialization: '',
    school: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [teams, setTeams] = useState(initialTeams); // State to hold teams

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

  useEffect(() => {
    if (selectedCoach) {
      setShowDetailCard(true);
    } else {
      const timer = setTimeout(() => setShowDetailCard(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedCoach]);

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
    setFormData({ name: '', teamName: '', experience: '', specialization: '', school: '' });
    setEditingCoach(null);
    setIsFormOpen(false);
  };

  const handleEdit = (coach) => {
    setEditingCoach(coach);
    setFormData({
      name: coach.name,
      teamName: coach.teamName,
      experience: coach.experience,
      specialization: coach.specialization,
      school: coach.school,
    });
    setIsFormOpen(true);
    setSelectedCoach(null);
  };

  const handleDelete = (coachToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${coachToDelete.name}?`)) {
      setCoaches(coaches.filter(coach => coach.id !== coachToDelete.id));
      setSelectedCoach(null);
    }
  };

  const handleAddNewClick = () => {
    setEditingCoach(null);
    setFormData({ name: '', teamName: '', experience: '', specialization: '', school: '' });
    setIsFormOpen(true);
    setSelectedCoach(null);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      const filtered = coaches.filter(coach => 
        coach.name.toLowerCase().includes(query.toLowerCase()) ||
        coach.teamName.toLowerCase().includes(query.toLowerCase()) ||
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
    setSearchQuery(`${coach.name} • ${coach.teamName} • ${coach.specialization} • ${coach.school}`);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleViewDetails = (coach) => {
    setSelectedCoach(coach);
  };

  const filteredCoaches = coaches.filter(coach => 
    coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.school.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(coach => ({
    ...coach,
    actions: (
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => handleViewDetails(coach)}
        >
          View Details
        </button>
         <button
          onClick={() => handleEdit(coach)}
          className="inline-flex items-center justify-center rounded-lg bg-orange-50 p-2 text-orange-600 hover:bg-orange-100 transition-all duration-200"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleDelete(coach)}
          className="inline-flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-all duration-200"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    )
  }));

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
                    {coach.teamName} • {coach.specialization} • {coach.school}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{editingCoach ? 'Edit Coach' : 'Add New Coach'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Coach Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
                  Team Name
                </label>
                <input
                  type="text"
                  name="teamName"
                  id="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  id="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <SchoolDropdown
                  value={formData.school}
                  onChange={handleInputChange}
                  label="School"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {editingCoach ? 'Update Coach' : 'Add Coach'}
              </button>
            </div>
          </form>
        </div>
      )}

      <CoachDetailCard 
        coach={selectedCoach} 
        onClose={() => setSelectedCoach(null)} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        show={showDetailCard}
      />

      <Table
        columns={columns}
        data={filteredCoaches}
        onEdit={handleEdit} // Note: onEdit and onDelete on the table row itself are now for the detail card
        onDelete={handleDelete} // They trigger the same functions, but the buttons are rendered via the 'actions' key
      />
    </div>
  );
}

export default Coach; 