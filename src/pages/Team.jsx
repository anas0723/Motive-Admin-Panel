import { useState } from 'react';
import Table from '../components/Table';

const initialTeams = [
  { id: 1, name: 'Team Alpha', coach: 'John Smith', athletes: 8 },
  { id: 2, name: 'Team Beta', coach: 'Sarah Johnson', athletes: 6 },
  { id: 3, name: 'Team Gamma', coach: 'Mike Brown', athletes: 10 },
];

const columns = [
  { key: 'name', label: 'Team Name' },
  { key: 'coach', label: 'Coach' },
  { key: 'athletes', label: 'Number of Athletes' },
];

function Team() {
  const [teams, setTeams] = useState(initialTeams);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    coach: '',
    athletes: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeam) {
      setTeams(teams.map(team =>
        team.id === editingTeam.id ? { ...formData, id: team.id } : team
      ));
    } else {
      setTeams([...teams, { ...formData, id: teams.length + 1 }]);
    }
    setFormData({ name: '', coach: '', athletes: '' });
    setEditingTeam(null);
    setIsFormOpen(false);
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      coach: team.coach,
      athletes: team.athletes,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (teamToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${teamToDelete.name}?`)) {
      setTeams(teams.filter(team => team.id !== teamToDelete.id));
    }
  };

  const handleAddNewClick = () => {
    setEditingTeam(null);
    setFormData({ name: '', coach: '', athletes: '' });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Teams</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all teams in your organization including their name, coach, and number of athletes.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            onClick={handleAddNewClick}
          >
            Add New Team
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{editingTeam ? 'Edit Team' : 'Add New Team'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Team Name
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
                <label htmlFor="coach" className="block text-sm font-medium text-gray-700">
                  Coach
                </label>
                <input
                  type="text"
                  name="coach"
                  id="coach"
                  value={formData.coach}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="athletes" className="block text-sm font-medium text-gray-700">
                  Number of Athletes
                </label>
                <input
                  type="number"
                  name="athletes"
                  id="athletes"
                  value={formData.athletes}
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
                {editingTeam ? 'Update Team' : 'Add Team'}
              </button>
            </div>
          </form>
        </div>
      )}

      <Table
        columns={columns}
        data={teams}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Team; 