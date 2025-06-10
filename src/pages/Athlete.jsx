import { useState, Fragment, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Table from '../components/Table';
import { useAthletes } from '../context/AthletesContext';
import { useSchools } from '../context/SchoolsContext';
import AthleteDetailCard from '../components/AthleteDetailCard';
import SchoolSearch from '../components/SchoolSearch';
import SchoolSelect from '../components/SchoolSelect';
import SchoolDropdown from '../components/SchoolDropdown';
import ProfilePictureUploader from '../components/ProfilePictureUploader';
import SportCategoryDropdown from '../components/SportCategoryDropdown';
import PersonCard from '../components/PersonCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Initial athletes data
export const initialAthletes = [
  { id: 1, name: 'John Doe', age: 25, sport: 'Running', team: 'Team Alpha', school: 'Lincoln High School', email: 'john.doe@example.com', phone: '555-1234', profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', age: 22, sport: 'Swimming', team: 'Team Beta', school: 'Washington Academy', email: 'jane.smith@example.com', phone: '555-5678', profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, name: 'Mike Johnson', age: 28, sport: 'Cycling', team: 'Team Alpha', school: 'Roosevelt High School', email: 'mike.johnson@example.com', phone: '555-9012', profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

const athleteColumns = [
  { key: 'name', label: 'Athlete Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'age', label: 'Age' },
  { key: 'sport', label: 'Sport' },
  { key: 'team', label: 'Team' },
  { key: 'school', label: 'School' },
  { key: 'actions', label: 'Actions' },
];

function Athlete() {
  const { athletes, setAthletes } = useAthletes();
  const { schools } = useSchools();
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sport: '',
    team: '',
    school: '',
    email: '',
    phone: '',
    profilePicture: null,
    profilePicturePreview: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type !== 'file') { // Handle non-file inputs
      const newValue = name === 'age' ? parseInt(value) || '' : value;
      setFormData({ ...formData, [name]: newValue });
    }
    // File input is handled by ProfilePictureUploader
  };

   const handleProfilePictureSelect = (file) => {
    if (file) {
      setFormData({ 
        ...formData, 
        profilePicture: file, 
        profilePicturePreview: URL.createObjectURL(file)
      });
    } else {
       setFormData({ 
        ...formData, 
        profilePicture: null, 
        profilePicturePreview: ''
      });
    }
  };

   const handleProfilePictureRemove = () => {
    setFormData({ 
      ...formData, 
      profilePicture: null, 
      profilePicturePreview: ''
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAthlete) {
      setAthletes(athletes.map(athlete =>
        athlete.id === editingAthlete.id ? { ...athlete, ...formData, id: editingAthlete.id } : athlete
      ));
    } else {
      setAthletes([...athletes, { ...formData, id: athletes.length + 1 }]);
    }
    // Reset form data and close modal
    setFormData({ name: '', age: '', sport: '', team: '', school: '', email: '', phone: '', profilePicture: null, profilePicturePreview: '' });
    setEditingAthlete(null);
    setIsFormOpen(false);
  };

  const handleEdit = (athlete) => {
    setEditingAthlete(athlete);
    setFormData({
      name: athlete.name,
      age: athlete.age,
      sport: athlete.sport,
      team: athlete.team,
      school: athlete.school,
      email: athlete.email,
      phone: athlete.phone,
      profilePicture: null,
      profilePicturePreview: athlete.profilePicture,
    });
    setIsFormOpen(true);
    setSelectedAthlete(null);
  };

  const handleDelete = (athlete) => {
    if (window.confirm(`Are you sure you want to delete ${athlete.name}?`)) {
      setAthletes(athletes.filter(a => a.id !== athlete.id));
      setSelectedAthlete(null);
      setShowDetailCard(false);
    }
  };

  const handleAddNewClick = () => {
    setEditingAthlete(null);
    setFormData({ name: '', age: '', sport: '', team: '', school: '', email: '', phone: '', profilePicture: null, profilePicturePreview: '' });
    setIsFormOpen(true);
  };

  const handleViewAthleteDetails = (athlete) => {
    setSelectedAthlete(athlete);
    setShowDetailCard(true);
  };

  const handleEditAthlete = (athlete) => {
    handleEdit(athlete); // Open form modal for editing
    setSelectedAthlete(null); // Close detail card
    setShowDetailCard(false);
  };

  const handleDeleteAthlete = (athlete) => {
    if (window.confirm(`Are you sure you want to delete ${athlete.name}?`)) {
      setAthletes(athletes.filter(a => a.id !== athlete.id));
      setSelectedAthlete(null);
      setShowDetailCard(false);
    }
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setEditingAthlete(null);
    setFormData({ name: '', age: '', sport: '', team: '', school: '', email: '', phone: '', profilePicture: null, profilePicturePreview: '' });
  };
  // Memoize filtered athletes for better performance
  const filteredAthletes = useMemo(() => {
    return athletes.filter(athlete => {
      // Case-insensitive school comparison
      const matchesSchool = !selectedSchool || 
        athlete.school.toLowerCase() === selectedSchool.toLowerCase();
      const matchesSearch = !searchQuery || 
        athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.sport.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSchool && matchesSearch;
    });
  }, [athletes, selectedSchool, searchQuery]);

  // Filter handlers
  const handleSchoolChange = (e) => {
    const newValue = e.target.value;
    console.log('School selected:', newValue);
    console.log('Athletes before filter:', athletes.length);
    setSelectedSchool(newValue);
    const filtered = athletes.filter(athlete => 
      athlete.school.toLowerCase() === newValue.toLowerCase()
    );
    console.log('Athletes after filter:', filtered.length);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSelectedSchool('');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Athletes</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all athletes in your organization including their name, sport, and school.
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

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-64">
            <SchoolDropdown
              value={selectedSchool}
              onChange={handleSchoolChange}
              label="Filter by School"
              className="mb-0"
            />
          </div>
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mt-6 sm:text-sm"
                placeholder="Search athletes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        {(selectedSchool || searchQuery) && (
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md">
            <div className="text-sm text-gray-600">
              Showing {filteredAthletes.length} {filteredAthletes.length === 1 ? 'athlete' : 'athletes'}
              {selectedSchool && ` from ${selectedSchool}`}
            </div>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none flex items-center gap-1"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Athletes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAthletes.map((athlete) => (
          <PersonCard
            key={athlete.id}
            person={athlete}
            onViewDetails={handleViewAthleteDetails}
          />
        ))}
      </div>

      {/* Athlete Form Modal */}
      <Transition appear show={isFormOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {editingAthlete ? 'Edit Athlete' : 'Add New Athlete'}
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        {/* Form fields */}
                         <div className="">
                          <ProfilePictureUploader
                            initialImageUrl={formData.profilePicturePreview}
                            onFileSelect={handleProfilePictureSelect}
                             onImageRemove={handleProfilePictureRemove}
                          />
                        </div>
                        <div className="">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                            Athlete Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="input-primary"
                            required
                          />
                        </div>
                        <div className="">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input-primary"
                            required
                          />
                        </div>
                        <div className="">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="input-primary"
                          />
                        </div>
                        <div className="">
                           <SportCategoryDropdown
                            value={formData.sport}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="">
                          <label htmlFor="age" className="block text-sm font-medium text-gray-800 mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            name="age"
                            id="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="input-primary"
                            required
                          />
                        </div>
                        <div className="">
                          <label htmlFor="team" className="block text-sm font-medium text-gray-800 mb-1">
                            Team
                          </label>
                          <input
                            type="text"
                            name="team"
                            id="team"
                            value={formData.team}
                            onChange={handleInputChange}
                            className="input-primary"
                          />
                        </div>
                        <div className="">
                          <SchoolDropdown
                            value={formData.school}
                            onChange={handleInputChange}
                            label="School"
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          {editingAthlete ? 'Update Athlete' : 'Add Athlete'}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Athlete Details Modal */}
      <AthleteDetailCard
        athlete={selectedAthlete}
        show={showDetailCard}
        onClose={() => {
          setSelectedAthlete(null);
          setShowDetailCard(false);
        }}
        onEdit={handleEditAthlete}
        onDelete={handleDeleteAthlete}
      />
    </div>
  );
}

export default Athlete;