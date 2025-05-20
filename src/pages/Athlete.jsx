import { useState } from 'react';
import Table from '../components/Table';

const initialAthletes = [
  { id: 1, name: 'John Doe', team: 'Team Alpha', age: 25, sport: 'Running' },
  { id: 2, name: 'Jane Smith', team: 'Team Beta', age: 22, sport: 'Swimming' },
  { id: 3, name: 'Mike Johnson', team: 'Team Alpha', age: 28, sport: 'Cycling' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'team', label: 'Team' },
  { key: 'age', label: 'Age' },
  { key: 'sport', label: 'Sport' },
];

function Athlete() {
  const [athletes, setAthletes] = useState(initialAthletes);
  const [editingAthlete, setEditingAthlete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    age: '',
    sport: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAthlete) {
      setAthletes(athletes.map(athlete =>
        athlete.id === editingAthlete.id ? { ...formData, id: athlete.id } : athlete
      ));
    } else {
      setAthletes([...athletes, { ...formData, id: athletes.length + 1 }]);
    }
    setFormData({ name: '', team: '', age: '', sport: '' });
    setEditingAthlete(null);
    setIsFormOpen(false);
  };

  const handleEdit = (athlete) => {
    setEditingAthlete(athlete);
    setFormData({
      name: athlete.name,
      team: athlete.team,
      age: athlete.age,
      sport: athlete.sport,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (athleteToDelete) => {
    setAthletes(athletes.filter(athlete => athlete.id !== athleteToDelete.id));
  };

  const handleAddNewClick = () => {
    setEditingAthlete(null);
    setFormData({ name: '', team: '', age: '', sport: '' });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Athletes</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all athletes in your organization.
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

      {isFormOpen && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">{editingAthlete ? 'Edit Athlete' : 'Add New Athlete'}</h2>
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
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
                  Sport
                </label>
                <input
                  type="text"
                  name="sport"
                  id="sport"
                  value={formData.sport}
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
                {editingAthlete ? 'Update Athlete' : 'Add Athlete'}
              </button>
            </div>
          </form>
        </div>
      )}

      <Table
        columns={columns}
        data={athletes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Athlete; 