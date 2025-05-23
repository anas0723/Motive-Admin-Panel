import { useState, useRef, useEffect } from 'react';
import Table from '../components/Table';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const initialSchools = [
  { id: 1, name: 'Central High School', city: 'Springfield', state: 'IL' },
  { id: 2, name: 'Northwood Academy', city: 'Oakville', state: 'CA' },
  { id: 3, name: 'Riverside Prep', city: 'Maplewood', state: 'NY' },
  { id: 4, name: 'Mountain View High', city: 'Boulder', state: 'CO' },
  { id: 5, name: 'Coastline Academy', city: 'Santa Monica', state: 'CA' },
  { id: 6, name: 'Lakewood School', city: 'Grand Rapids', state: 'MI' },
  { id: 7, name: 'Forest Hill High', city: 'Portland', state: 'OR' },
  { id: 8, name: 'Desert Sands Academy', city: 'Phoenix', state: 'AZ' },
  { id: 9, name: 'Prairie Creek School', city: 'Omaha', state: 'NE' },
  { id: 10, name: 'Bay City High', city: 'San Francisco', state: 'CA' },
  { id: 11, name: 'Summit Ridge Academy', city: 'Denver', state: 'CO' },
  { id: 12, name: 'Maple Valley School', city: 'Seattle', state: 'WA' },
  { id: 13, name: 'Greenwood High', city: 'Boston', state: 'MA' },
  { id: 14, name: 'Pinehurst Prep', city: 'Charlotte', state: 'NC' },
  { id: 15, name: 'Oak Knoll Academy', city: 'Austin', state: 'TX' },
  { id: 16, name: 'Riverbend High', city: 'Nashville', state: 'TN' },
  { id: 17, name: 'Stone Creek School', city: 'Atlanta', state: 'GA' },
  { id: 18, name: 'Willow Creek Academy', city: 'Chicago', state: 'IL' },
  { id: 19, name: 'Harbor View High', city: 'Miami', state: 'FL' },
  { id: 20, name: 'Eagle Peak Prep', city: 'Salt Lake City', state: 'UT' },
  { id: 21, name: 'Sunrise School', city: 'Orlando', state: 'FL' },
  { id: 22, name: 'Thunder Ridge High', city: 'Boise', state: 'ID' },
];

const columns = [
  { key: 'name', label: 'School Name' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
];

function School() {
  const [schools, setSchools] = useState(initialSchools);
  const [editingSchool, setEditingSchool] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
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
    if (editingSchool) {
      setSchools(schools.map(school =>
        school.id === editingSchool.id ? { ...formData, id: school.id } : school
      ));
    } else {
      setSchools([...schools, { ...formData, id: schools.length + 1 }]);
    }
    setFormData({ name: '', city: '', state: '' });
    setEditingSchool(null);
    setIsFormOpen(false);
  };

  const handleEdit = (school) => {
    setEditingSchool(school);
    setFormData({
      name: school.name,
      city: school.city,
      state: school.state,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (schoolToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${schoolToDelete.name}?`)) {
      setSchools(schools.filter(school => school.id !== schoolToDelete.id));
    }
  };

  const handleAddNewClick = () => {
    setEditingSchool(null);
    setFormData({ name: '', city: '', state: '' });
    setIsFormOpen(true);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      const filtered = schools.filter(school => 
        school.name.toLowerCase().includes(query.toLowerCase()) ||
        school.city.toLowerCase().includes(query.toLowerCase()) ||
        school.state.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (school) => {
    setSearchQuery(school.name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Filter schools based on search query
  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Schools</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all schools in the organization.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            onClick={handleAddNewClick}
          >
            Add New School
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
          placeholder="Search schools by name, city, or state..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
        />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-h-60">
            {suggestions.map((school) => (
              <div
                key={school.id}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                onClick={() => handleSuggestionClick(school)}
              >
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{school.name}</span>
                  <span className="ml-2 text-gray-500">
                    {school.city}, {school.state}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{editingSchool ? 'Edit School' : 'Add New School'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  School Name
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
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formData.state}
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
                {editingSchool ? 'Update School' : 'Add School'}
              </button>
            </div>
          </form>
        </div>
      )}

      <Table
        columns={columns}
        data={filteredSchools}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default School; 