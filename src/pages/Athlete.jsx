import { useState, useRef, useEffect } from 'react';
import Table from '../components/Table';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import AthleteDetailCard from '../components/AthleteDetailCard';

const initialAthletes = [
  { id: 1, name: 'John Doe', team: 'Team Alpha', age: 25, sport: 'Running', school: 'Central High School' },
  { id: 2, name: 'Jane Smith', team: 'Team Beta', age: 22, sport: 'Swimming', school: 'Northwood Academy' },
  { id: 3, name: 'Mike Johnson', team: 'Team Alpha', age: 28, sport: 'Cycling', school: 'Riverside Prep' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'team', label: 'Team' },
  { key: 'age', label: 'Age' },
  { key: 'sport', label: 'Sport' },
  { key: 'school', label: 'School' },
  { key: 'actions', label: 'Actions' },
];

function Athlete() {
  const [athletes, setAthletes] = useState(initialAthletes);
  const [editingAthlete, setEditingAthlete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    age: '',
    sport: '',
    school: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showDetailCard, setShowDetailCard] = useState(false);

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
    if (selectedAthlete) {
      setShowDetailCard(true);
    } else {
      const timer = setTimeout(() => setShowDetailCard(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedAthlete]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAthlete) {
      setAthletes(athletes.map(athlete =>
        athlete.id === editingAthlete.id ? { ...formData, id: athlete.id } : athlete
      ));
    } else {
      setAthletes([...athletes, { ...formData, id: athletes.length + 1 }]);
    }
    setFormData({ name: '', team: '', age: '', sport: '', school: '' });
    setEditingAthlete(null);
    setIsFormOpen(false);
  };

  const handleEdit = (athlete) => {
    setEditingAthlete(athlete);
    setFormData({
      name: athlete.name,
      team: athlete.team,
      age: athlete.age,
      sport: athlete.sport,
      school: athlete.school,
    });
    setIsFormOpen(true);
    setSelectedAthlete(null);
  };

  const handleDelete = (athleteToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${athleteToDelete.name}?`)) {
      setAthletes(athletes.filter(athlete => athlete.id !== athleteToDelete.id));
      setSelectedAthlete(null);
    }
  };

  const handleAddNewClick = () => {
    setEditingAthlete(null);
    setFormData({ name: '', team: '', age: '', sport: '', school: '' });
    setIsFormOpen(true);
    setSelectedAthlete(null);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      const filtered = athletes.filter(athlete => 
        athlete.name.toLowerCase().includes(query.toLowerCase()) ||
        athlete.team.toLowerCase().includes(query.toLowerCase()) ||
        athlete.sport.toLowerCase().includes(query.toLowerCase()) ||
        athlete.school.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (athlete) => {
    setSearchQuery(`${athlete.name} • ${athlete.team} • ${athlete.sport} • ${athlete.school}`);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleViewDetails = (athlete) => {
    setSelectedAthlete(athlete);
  };

  const filteredAthletes = athletes.filter(athlete => 
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.school.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(athlete => ({
    ...athlete,
    actions: (
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => handleViewDetails(athlete)}
        >
          View Details
        </button>
        <button
          onClick={() => handleEdit(athlete)}
          className="inline-flex items-center justify-center rounded-lg bg-orange-50 p-2 text-orange-600 hover:bg-orange-100 transition-all duration-200"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleDelete(athlete)}
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
          <h1 className="text-2xl font-semibold text-gray-900">Athletes</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all athletes in your organization.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            onClick={handleAddNewClick}
          >
            Add New Athlete
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
          placeholder="Search athletes by name, team, sport, or school..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-h-60">
            {suggestions.map((athlete) => (
              <div
                key={athlete.id}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                onClick={() => handleSuggestionClick(athlete)}
              >
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{athlete.name}</span>
                  <span className="ml-2 text-gray-500">
                    {athlete.team} • {athlete.sport} • {athlete.school}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{editingAthlete ? 'Edit Athlete' : 'Add New Athlete'}</h2>
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
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
                  Sport
                </label>
                <input
                  type="text"
                  name="sport"
                  id="sport"
                  value={formData.sport}
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
                {editingAthlete ? 'Update Athlete' : 'Add Athlete'}
              </button>
            </div>
          </form>
        </div>
      )}

      <AthleteDetailCard 
        athlete={selectedAthlete} 
        onClose={() => setSelectedAthlete(null)} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        show={showDetailCard}
      />

      <Table
        columns={columns}
        data={filteredAthletes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Athlete; 