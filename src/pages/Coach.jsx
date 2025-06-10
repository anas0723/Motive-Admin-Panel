import { useState, Fragment, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import SchoolDropdown from '../components/SchoolDropdown';
import ProfilePictureUploader from '../components/ProfilePictureUploader';
import SportCategoryDropdown from '../components/SportCategoryDropdown';
import { useSchools } from '../context/SchoolsContext';
import PersonCard from '../components/PersonCard';
import PersonDetailModal from '../components/PersonDetailModal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import SchoolSelect from '../components/SchoolSelect';

const initialCoaches = [
  { id: 1, name: 'Sarah Wilson', teamName: 'Team Alpha', experience: '10 years', specialization: 'Running', school: 'Central High School', email: 'sarah.wilson@example.com', phone: '555-2345', profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg', sport: 'Basketball' },
  { id: 2, name: 'David Brown', teamName: 'Team Beta', experience: '8 years', specialization: 'Swimming', school: 'Northwood Academy', email: 'david.brown@example.com', phone: '555-6789', profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg', sport: 'Basketball' },
  { id: 3, name: 'Lisa Chen', teamName: 'Team Alpha', experience: '12 years', specialization: 'Cycling', school: 'Riverside Prep', email: 'lisa.chen@example.com', phone: '555-0123', profilePicture: 'https://randomuser.me/api/portraits/women/6.jpg', sport: 'Basketball' },
];

function Coach() {
  const [coaches, setCoaches] = useState(initialCoaches);
  const [editingCoach, setEditingCoach] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    specialization: '',
    school: '',
    email: '',
    phone: '',
    profilePicture: null,
    profilePicturePreview: '',
    sport: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const { schools } = useSchools(); // Access schools from context
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type !== 'file') { // Handle non-file inputs
       setFormData({ ...formData, [name]: value });
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
    const newCoach = {
      id: editingCoach ? editingCoach.id : Date.now(),
      ...formData,
      profilePicture: formData.profilePicturePreview || formData.profilePicture,
    };

    if (editingCoach) {
      setCoaches(coaches.map((coach) => (coach.id === editingCoach.id ? newCoach : coach)));
    } else {
      setCoaches([...coaches, newCoach]);
    }

    handleCloseModal();
  };

  const handleEdit = (coach) => {
    setEditingCoach(coach);
    setFormData({
      name: coach.name,
      experience: coach.experience,
      specialization: coach.specialization,
      school: coach.school,
      email: coach.email,
      phone: coach.phone,
      profilePicture: null,
      profilePicturePreview: coach.profilePicture,
      sport: coach.sport,
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
    setFormData({ name: '', experience: '', specialization: '', school: '', email: '', phone: '', profilePicture: null, profilePicturePreview: '', sport: '' });
    setIsFormOpen(true);
    setSelectedCoach(null);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleViewDetails = (coach) => {
    setSelectedCoach(coach);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setEditingCoach(null);
    setFormData({
      name: '',
      experience: '',
      specialization: '',
      school: '',
      email: '',
      phone: '',
      profilePicture: null,
      profilePicturePreview: '',
      sport: '',
    });
    setShowModal(false);
  };

  // Memoize filtered coaches for better performance
  const filteredCoaches = useMemo(() => {
    return coaches.filter((coach) => {
      const matchesSchool = !selectedSchool || coach.school.toLowerCase() === selectedSchool.name.toLowerCase();
      const matchesSearch = !searchQuery || 
        coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.school.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSchool && matchesSearch;
    });
  }, [coaches, selectedSchool, searchQuery]);

  const handleClearFilters = () => {
    setSelectedSchool(null);
    setSearchQuery('');
  };

  const handleSchoolChange = (school) => {
    setSelectedSchool(school ? school.name : null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Coaches</h1>
        <Button onClick={handleAddNewClick}>
          Add New Coach
        </Button>
      </div>

      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-64">
            <label htmlFor="school-filter" className="block text-sm font-medium text-gray-700">
              Filter by School
            </label>
            <SchoolDropdown
              id="school-filter"
              value={selectedSchool}
              onChange={handleSchoolChange}
              label=""
              className="mb-0"
            />
          </div>
          <div className="flex-1 mt-6 sm:mt-0">
            <label htmlFor="coach-search" className="block text-sm font-medium text-gray-700 sr-only">
              Search coaches
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="coach-search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search Coaches..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        {(selectedSchool || searchQuery) && (
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md">
            <div className="text-sm text-gray-600">
              Showing {filteredCoaches.length} {filteredCoaches.length === 1 ? 'coach' : 'coaches'}
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

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map((coach) => (
          <PersonCard
            key={coach.id}
            person={coach}
            onViewDetails={() => handleViewDetails(coach)}
          />
        ))}
      </div>

      {/* Coach Form Modal (Add/Edit Coach) */}
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {editingCoach ? 'Edit Coach' : 'Add New Coach'}
                  </Dialog.Title>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <ProfilePictureUploader
                        currentPicture={formData.profilePicturePreview}
                        onSelectPicture={handleProfilePictureSelect}
                        onRemovePicture={handleProfilePictureRemove}
                      />
                      <Input
                        label="Coach Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Coach Name"
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        required
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                      />
                      <Input
                        label="Experience"
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="e.g., 10 years"
                      />
                      <Input
                        label="Specialization"
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="e.g., Running, Swimming"
                      />
                      <SportCategoryDropdown
                        selectedSport={formData.sport}
                        onSelectSport={(sport) => setFormData({ ...formData, sport: sport?.name || '' })}
                      />
                      <SchoolSelect
                        schools={schools}
                        selectedSchool={schools.find(s => s.name === formData.school)}
                        onSelectSchool={(school) => setFormData({ ...formData, school: school?.name || '' })}
                      />

                      <div className="mt-6 flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingCoach ? 'Save Changes' : 'Add Coach'}
                        </Button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Person Detail Modal */}
      {selectedCoach && (
        <PersonDetailModal
          show={showModal}
          onClose={handleCloseModal}
          person={selectedCoach}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Coach;