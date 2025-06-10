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
import PersonCard from '../components/PersonCard';
import PersonDetailModal from '../components/PersonDetailModal';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import SchoolFilter from '../components/SchoolFilter';

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
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
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
    setShowModal(false);
  };

  // Memoize filtered coaches for better performance
  const filteredCoaches = useMemo(() => {
    return coaches.filter((coach) => {
      const matchesSchool = !selectedSchool || coach.school.toLowerCase() === selectedSchool.name.toLowerCase();
      const matchesSearch = !searchQuery || 
        coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coach.teamName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSchool && matchesSearch;
    });
  }, [coaches, selectedSchool, searchQuery]);

  const clearFilters = () => {
    setSelectedSchool(null);
    setSearchQuery('');
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
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search coaches..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="sm:max-w-xs"
          />
          <SchoolFilter
            schools={schools}
            selectedSchool={selectedSchool}
            onChange={setSelectedSchool}
          />
        </div>
      </Card>

      {/* Coaches table */}
      <Table
        columns={columns}
        data={filteredCoaches}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Coach details modal */}
      <PersonDetailModal
        person={selectedCoach}
        show={showModal}
        onClose={handleCloseModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Coach;