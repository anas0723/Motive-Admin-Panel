import { useState, useEffect, useMemo } from 'react';
import Table from '../components/Table';
import PersonDetailModal from '../components/PersonDetailModal';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import SchoolFilter from '../components/SchoolFilter';
import LimitSelector from '../components/LimitSelector';
import PaginatedList from '../components/PaginatedList';

const Athletes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [schools, setSchools] = useState([]);

  // Mock data for schools
  useEffect(() => {
    setSchools([
      { id: 1, name: 'Lincoln High School' },
      { id: 2, name: 'Washington Academy' },
      { id: 3, name: 'Central High School' },
    ]);
  }, []);

  // Mock data for athletes
  const athletes = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, City, State',
      dob: '2000-01-15',
      teamName: 'Varsity Basketball',
      experience: '2 years',
      specialization: 'Forward',
      sport: 'Basketball',
      school: 'Lincoln High School',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, City, State',
      dob: '2001-03-20',
      teamName: 'Varsity Swimming',
      experience: '3 years',
      specialization: 'Freestyle',
      sport: 'Swimming',
      school: 'Washington Academy',
      profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      phone: '(555) 456-7890',
      address: '789 Sports Blvd, City, State',
      dob: '2002-07-10',
      teamName: 'Varsity Football',
      experience: '1 year',
      specialization: 'Quarterback',
      sport: 'Football',
      school: 'Central High School',
      profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
    }
  ];

  const columns = [
    { key: 'profilePicture', label: '' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'teamName', label: 'Team Name' },
    { key: 'experience', label: 'Experience' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'school', label: 'School' },
  ];

  const handleViewDetails = (athlete) => {
    setSelectedAthlete(athlete);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAthlete(null);
  };

  const handleEdit = (athlete) => {
    // Implement edit functionality
    console.log('Edit athlete:', athlete);
  };

  const handleDelete = (athlete) => {
    if (window.confirm(`Are you sure you want to delete ${athlete.name}?`)) {
      // Implement delete functionality
      console.log('Delete athlete:', athlete);
    }
  };

  // Filter athletes based on search query and selected school
  const filteredAthletes = useMemo(() => {
    return athletes.filter(athlete =>
      (athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.school.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedSchool || athlete.school === selectedSchool.name)
    );
  }, [athletes, searchQuery, selectedSchool]);

  const { paginatedData: paginatedAthletes, paginationControls } = PaginatedList({ data: filteredAthletes });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Athletes</h1>
        <Button onClick={() => {/* Add new athlete */}}>
          Add New Athlete
        </Button>
      </div>

      {/* Search and filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search athletes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:max-w-xs"
          />
          <SchoolFilter
            schools={schools}
            selectedSchool={selectedSchool}
            onChange={setSelectedSchool}
          />
        </div>
      </Card>

      {/* Athletes table */}
      <Table
        columns={columns}
        data={paginatedAthletes}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination/Limit Selector */}
      {paginationControls}

      {/* Athlete details modal */}
      <PersonDetailModal
        person={selectedAthlete}
        show={showModal}
        onClose={handleCloseModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Athletes; 