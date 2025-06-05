import { useState, useRef, useEffect, Fragment, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Table from '../components/Table';
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import CoachDetailCard from '../components/CoachDetailCard';
import { initialTeams } from './Team'; // Import initialTeams
import SchoolSelect from '../components/SchoolSelect';
import SchoolDropdown from '../components/SchoolDropdown';
import ProfilePictureUploader from '../components/ProfilePictureUploader';
import SportCategoryDropdown from '../components/SportCategoryDropdown';
import { useSchools } from '../context/SchoolsContext';

const initialCoaches = [
  { id: 1, name: 'Sarah Wilson', teamName: 'Team Alpha', experience: '10 years', specialization: 'Running', school: 'Central High School', email: 'sarah.wilson@example.com', phone: '555-2345', profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 2, name: 'David Brown', teamName: 'Team Beta', experience: '8 years', specialization: 'Swimming', school: 'Northwood Academy', email: 'david.brown@example.com', phone: '555-6789', profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: 3, name: 'Lisa Chen', teamName: 'Team Alpha', experience: '12 years', specialization: 'Cycling', school: 'Riverside Prep', email: 'lisa.chen@example.com', phone: '555-0123', profilePicture: 'https://randomuser.me/api/portraits/women/6.jpg' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'phone', label: 'Phone Number' },
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
    email: '',
    phone: '',
    profilePicture: null,
    profilePicturePreview: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const { schools } = useSchools(); // Access schools from context
  const [selectedSchool, setSelectedSchool] = useState('');

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
      teamName: coach.teamName,
      experience: coach.experience,
      specialization: coach.specialization,
      school: coach.school,
      email: coach.email,
      phone: coach.phone,
      profilePicture: null,
      profilePicturePreview: coach.profilePicture,
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
    setFormData({ name: '', teamName: '', experience: '', specialization: '', school: '', email: '', phone: '', profilePicture: null, profilePicturePreview: '' });
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

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setEditingCoach(null);
    setFormData({
      name: '',
      teamName: '',
      experience: '',
      specialization: '',
      school: '',
      email: '',
      phone: '',
      profilePicture: null,
      profilePicturePreview: '',
    });
  };

  // Memoize filtered coaches for better performance
  const filteredCoaches = useMemo(() => {
    return coaches.filter((coach) => {
      const matchesSchool = !selectedSchool || coach.school.toLowerCase() === selectedSchool.toLowerCase();
      const matchesSearch = !searchQuery || 
        coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.teamName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSchool && matchesSearch;
    });
  }, [coaches, selectedSchool, searchQuery]);

  const clearFilters = () => {
    setSelectedSchool('');
    setSearchQuery('');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Coaches</h1>
          <p className="mt-2 text-sm text-gray-700">
            {filteredCoaches.length} coach{filteredCoaches.length !== 1 ? 'es' : ''} found
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => {
              setEditingCoach(null);
              setFormData({
                name: '',
                teamName: '',
                experience: '',
                specialization: '',
                school: '',
                email: '',
                phone: '',
                profilePicture: null,
                profilePicturePreview: '',
              });
              setIsFormOpen(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Coach
          </button>
        </div>
      </div>     
     <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex gap-4">
          <SchoolDropdown
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="flex-1"
          />
          {(selectedSchool || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <Table
                data={filteredCoaches}
                columns={columns}
                onRowClick={(coach) => setSelectedCoach(coach)}
                renderCell={(row, column) => {
                  if (column.key === 'actions') {
                    return (
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCoach(row);
                            setFormData({
                              ...row,
                              profilePicturePreview: row.profilePicture,
                            });
                            setIsFormOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const confirmDelete = window.confirm('Are you sure you want to delete this coach?');
                            if (confirmDelete) {
                              setCoaches(coaches.filter((c) => c.id !== row.id));
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Coach Form Modal */}
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
                    {editingCoach ? 'Edit Coach' : 'Add New Coach'}
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
                            Coach Name
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
                          <label htmlFor="teamName" className="block text-sm font-medium text-gray-800 mb-1">
                            Team Name
                          </label>
                          <input
                            type="text"
                            name="teamName"
                            id="teamName"
                            value={formData.teamName}
                            onChange={handleInputChange}
                            className="input-primary"
                            required
                          />
                        </div>
                        <div className="">
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-800 mb-1">
                            Experience
                          </label>
                          <input
                            type="text"
                            name="experience"
                            id="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="input-primary"
                            required
                          />
                        </div>
                        <div className="">
                          <label htmlFor="specialization" className="block text-sm font-medium text-gray-800 mb-1">
                            Specialization
                          </label>
                          <input
                            type="text"
                            name="specialization"
                            id="specialization"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            className="input-primary"
                            required
                          />
                        </div>
                        <SchoolDropdown
                          value={formData.school}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {editingCoach ? 'Save Changes' : 'Add Coach'}
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

      {/* Coach Detail Card */}
      <Transition
        show={showDetailCard}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-4"
      >
        {selectedCoach && (
          <div className="fixed bottom-0 right-0 mb-4 mr-4 w-96">
            <CoachDetailCard
              coach={selectedCoach}
              onClose={() => setSelectedCoach(null)}
            />
          </div>
        )}
      </Transition>
    </div>
  );
}

export default Coach;