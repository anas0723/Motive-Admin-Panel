import { useState } from 'react';
import Table from '../components/Table';

const initialCoaches = [
  { id: 1, name: 'Robert Davis', team: 'Team Gamma', experience: '10 years', specialty: 'Strength Training' },
  { id: 2, name: 'Lisa Miller', team: 'Team Beta', experience: '7 years', specialty: 'Cardio' },
  { id: 3, name: 'Chris Wilson', team: 'Team Alpha', experience: '12 years', specialty: 'Flexibility' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'team', label: 'Team' },
  { key: 'experience', label: 'Experience' },
  { key: 'specialty', label: 'Specialty' },
];

function Coach() {
  const [coaches, setCoaches] = useState(initialCoaches);
  const [editingCoach, setEditingCoach] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    experience: '',
    specialty: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCoach) {
      setCoaches(coaches.map(coach =>
        coach.id === editingCoach.id ? { ...formData, id: coach.id } : coach
      ));
    } else {
      setCoaches([...coaches, { ...formData, id: coaches.length + 1 }]);
    }
    setFormData({ name: '', team: '', experience: '', specialty: '' });
    setEditingCoach(null);
    setIsFormOpen(false);
  };

  const handleEdit = (coach) => {
    setEditingCoach(coach);
    setFormData({
      name: coach.name,
      team: coach.team,
      experience: coach.experience,
      specialty: coach.specialty,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (coachToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${coachToDelete.name}?`)) {
      setCoaches(coaches.filter(coach => coach.id !== coachToDelete.id));
    }
  };

  const handleAddNewClick = () => {
    setEditingCoach(null);
    setFormData({ name: '', team: '', experience: '', specialty: '' });
    setIsFormOpen(true);
  };

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

      {isFormOpen && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{editingCoach ? 'Edit Coach' : 'Add New Coach'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="team" className="block text-sm font-medium text-gray-700">
                  Team
                </label>
                <input
                  type="text"
                  name="team"
                  id="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                  Specialty
                </label>
                <input
                  type="text"
                  name="specialty"
                  id="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {editingCoach ? 'Update Coach' : 'Add Coach'}
              </button>
            </div>
          </form>
        </div>
      )}

      <Table
        columns={columns}
        data={coaches}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Coach; 