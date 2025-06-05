import { useState, Fragment } from 'react';
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
  const { schools, selectedSchool } = useSchools();
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  // Filter athletes based on selected school and add actions button
  const filteredAthletes = (selectedSchool
    ? athletes.filter(athlete => athlete.school === selectedSchool.name)
    : athletes
  ).map(athlete => ({
    ...athlete,
    actions: (
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => handleViewAthleteDetails(athlete)}
        >
          View Details
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => handleEdit(athlete)}
        >
          Edit
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => handleDelete(athlete)}
        >
          Delete
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
            A list of all athletes in your organization including their name, age, sport, team, and school.
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

      <div className="mb-6">
        <SchoolSearch className="max-w-md" />
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

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <Table
              columns={athleteColumns}
              data={filteredAthletes}
              onEdit={handleEditAthlete}
              onDelete={handleDeleteAthlete}
              onRowClick={handleViewAthleteDetails}
            />
          </div>
        </div>
      </div>

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