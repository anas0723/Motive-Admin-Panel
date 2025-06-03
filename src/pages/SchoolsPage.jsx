import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const mockSchools = [
  {
    id: 1,
    name: 'Lincoln High School',
    city: 'Springfield',
    state: 'IL',
    teams: 12,
    athletes: 250,
    coaches: 15,
  },
  {
    id: 2,
    name: 'Washington Academy',
    city: 'Chicago',
    state: 'IL',
    teams: 8,
    athletes: 180,
    coaches: 10,
  },
  // Add more mock data as needed
];

function SchoolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const states = [
    { value: '', label: 'All States' },
    { value: 'IL', label: 'Illinois' },
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    // Add more states as needed
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage schools and their associated teams, athletes, and coaches
          </p>
        </div>
        <Button
          variant="primary"
          icon={PlusIcon}
          onClick={() => {/* Add new school */}}
        >
          Add School
        </Button>
      </div>

      {/* Filters */}
      <Card variant="bordered">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Search Schools"
            placeholder="Search by name, city, or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={MagnifyingGlassIcon}
          />
          <Select
            label="Filter by State"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            options={states}
          />
        </div>
      </Card>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSchools.map((school) => (
          <Card
            key={school.id}
            variant="elevated"
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                <p className="text-sm text-gray-500">
                  {school.city}, {school.state}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{school.teams}</p>
                  <p className="text-xs text-gray-500">Teams</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-500">{school.athletes}</p>
                  <p className="text-xs text-gray-500">Athletes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{school.coaches}</p>
                  <p className="text-xs text-gray-500">Coaches</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {/* View details */}}
                >
                  View Details
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {/* Edit school */}}
                >
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SchoolsPage; 