import { useState } from 'react';
import Table from '../components/Table';
import { useAthletes } from '../context/AthletesContext';
import { useSchools } from '../context/SchoolsContext';
import AthleteDetailCard from '../components/AthleteDetailCard';
import SchoolSearch from '../components/SchoolSearch';
import SchoolSelect from '../components/SchoolSelect';
import SchoolDropdown from '../components/SchoolDropdown';

// Initial athletes data
export const initialAthletes = [
  { id: 1, name: 'John Doe', age: 25, sport: 'Running', team: 'Team Alpha', school: 'Lincoln High School' },
  { id: 2, name: 'Jane Smith', age: 22, sport: 'Swimming', team: 'Team Beta', school: 'Washington Academy' },
  { id: 3, name: 'Mike Johnson', age: 28, sport: 'Cycling', team: 'Team Alpha', school: 'Roosevelt High School' },
];

const athleteColumns = [
  { key: 'name', label: 'Athlete Name' },
  { key: 'age', label: 'Age' },
  { key: 'sport', label: 'Sport' },
  { key: 'team', label: 'Team' },
  { key: 'school', label: 'School' },
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
  });

  const handleInputChange = (e) => {
    const value = e.target.name === 'age' ? parseInt(e.target.value) || '' : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAthlete) {
      setAthletes(athletes.map(athlete =>
        athlete.id === editingAthlete.id ? { ...formData, id: editingAthlete.id } : athlete
      ));
    } else {
      setAthletes([...athletes, { ...formData, id: athletes.length + 1 }]);
    }
    setFormData({ name: '', age: '', sport: '', team: '', school: '' });
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
    });
    setIsFormOpen(true);
  };

  const handleDelete = (athleteToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${athleteToDelete.name}?`)) {
      setAthletes(athletes.filter(athlete => athlete.id !== athleteToDelete.id));
    }
  };

  const handleAddNewClick = () => {
    setEditingAthlete(null);
    setFormData({ name: '', age: '', sport: '', team: '', school: '' });
    setIsFormOpen(true);
  };

  const handleViewAthleteDetails = (athlete) => {
    setSelectedAthlete(athlete);
    setShowDetailCard(true);
  };

  const handleEditAthlete = (athlete) => {
    setEditingAthlete(athlete);
    setSelectedAthlete(null);
    setShowDetailCard(false);
  };

  const handleDeleteAthlete = (athlete) => {
    if (window.confirm(`Are you sure you want to delete ${athlete.name}?`)) {
      setAthletes(athletes.filter(a => a.id !== athlete.id));
      setSelectedAthlete(null);
      setShowDetailCard(false);
    }
  };

  // Filter athletes based on selected school
  const filteredAthletes = selectedSchool
    ? athletes.filter(athlete => athlete.school === selectedSchool.name)
    : athletes;

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

      {isFormOpen && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{editingAthlete ? 'Edit Athlete' : 'Add New Athlete'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Athlete Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-1">
                  Sport
                </label>
                <input
                  type="text"
                  name="sport"
                  id="sport"
                  value={formData.sport}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
                  Team
                </label>
                <input
                  type="text"
                  name="team"
                  id="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 py-2 px-3 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <SchoolDropdown
                  value={formData.school}
                  onChange={handleInputChange}
                  label="School"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsFormOpen(false)}
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
      )}

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <Table
              columns={athleteColumns}
              data={filteredAthletes}
              onEdit={handleEdit}
              onDelete={handleDelete}
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