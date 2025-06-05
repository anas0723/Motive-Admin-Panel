import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import AthleteDetailCard from './AthleteDetailCard';

const mockAthletes = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    team: 'Varsity Basketball',
    age: 16,
    sport: 'Basketball',
    school: 'Lincoln High School',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 987-6543',
    team: 'Varsity Swimming',
    age: 15,
    sport: 'Swimming',
    school: 'Washington Academy',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // Add more mock data as needed
];

function AthleteList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const sports = [
    { value: '', label: 'All Sports' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'football', label: 'Football' },
    { value: 'track', label: 'Track & Field' },
  ];

  const handleViewDetails = (athlete) => {
    setSelectedAthlete(athlete);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedAthlete(null);
  };



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Athletes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage athletes and their performance metrics
          </p>
        </div>
        <Button
          variant="primary"
          icon={PlusIcon}
          onClick={() => {/* Add new athlete */}}
        >
          Add Athlete
        </Button>
      </div>

      {/* Filters */}
      <Card variant="bordered">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Search Athletes"
            placeholder="Search by name, team, or sport..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={MagnifyingGlassIcon}
          />
          <Select
            label="Filter by Sport"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            options={sports}
          />
        </div>
      </Card>

      {/* Athletes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAthletes.map((athlete) => (
          <Card
            key={athlete.id}
            variant="elevated"
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={athlete.profilePicture}
                  alt={`${athlete.name}'s profile`}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-100"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{athlete.name}</h3>
                  <p className="text-sm text-gray-500">{athlete.sport}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-500">Team</p>
                  <p className="text-sm text-gray-900">{athlete.team}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">School</p>
                  <p className="text-sm text-gray-900">{athlete.school}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => handleViewDetails(athlete)}
                >
                  View Details
                </button>
               
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Athlete Details Modal */}
      <AthleteDetailCard
        athlete={selectedAthlete}
        show={showDetails}
        onClose={handleCloseDetails}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AthleteList; 