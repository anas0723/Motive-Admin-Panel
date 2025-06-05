import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Athletes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data
  const athletes = [
    { id: 1, name: 'John Doe', team: 'Team A', sport: 'Basketball', school: 'School 1' },
    { id: 2, name: 'Jane Smith', team: 'Team B', sport: 'Swimming', school: 'School 2' },
    // Add more mock data
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Athletes</h1>
        <Button onClick={() => setIsModalOpen(true)}>
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
          {/* Add more filters here */}
        </div>
      </Card>

      {/* Athletes list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes.map((athlete) => (
          <Card key={athlete.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{athlete.name}</h3>
                <p className="text-sm text-gray-500">{athlete.team}</p>
              </div>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <span className="text-gray-500 w-20">Sport:</span>
                <span className="text-gray-900">{athlete.sport}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-500 w-20">School:</span>
                <span className="text-gray-900">{athlete.school}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Add New Athlete</h2>
            <form className="space-y-4">
              <Input label="Name" placeholder="Enter athlete name" />
              <Input label="Team" placeholder="Select team" />
              <Input label="Sport" placeholder="Select sport" />
              <Input label="School" placeholder="Select school" />
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Athlete
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Athletes; 