import { useState, useRef, useEffect, Fragment } from 'react';
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
    if (editingCoach) {
      setCoaches(coaches.map(coach =>
        coach.id === editingCoach.id ? { ...coach, ...formData, id: coach.id } : coach
      ));
    } else {
      setCoaches([...coaches, { ...formData, id: coaches.length + 1 }]);
    }
    // Reset form data and close modal
    setFormData({ name: '', teamName: '', experience: '', specialization: '', school: '', email: '', phone: '', profilePicture: null, profilePicturePreview: '' });
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
    setFormData({ name: '', teamName: '', experience: '', specialization: '', school: '', email: '', phone: '', profilePicture: null, profilePicturePreview: '' });
  };

  const filteredCoaches = coaches.filter(coach => 
    coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coach.school.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(coach => ({
    ...coach,
    school: schools.find(school => school.id === coach.school)?.name || coach.school, // Display school name or ID if not found
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
                           <SportCategoryDropdown
                            value={formData.specialization}
                            onChange={handleInputChange}
                            label="Specialization"
                            required
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
                          {editingCoach ? 'Update Coach' : 'Add Coach'}
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

      <CoachDetailCard 
        coach={selectedCoach} 
        onClose={() => setSelectedCoach(null)} 
        onEdit={handleEdit} // Note: onEdit and onDelete on the table row itself are now for the detail card
        onDelete={handleDelete} // They trigger the same functions, but the buttons are rendered via the 'actions' key
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