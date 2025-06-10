import { useState } from 'react';
import Table from '../components/Table';
import { useAthletes } from '../context/AthletesContext';
import { useSchools } from '../context/SchoolsContext';
import AthleteDetailCard from '../components/AthleteDetailCard';
import SchoolSearch from '../components/SchoolSearch';
import SchoolSelect from '../components/SchoolSelect';
import SchoolDropdown from '../components/SchoolDropdown';
import LimitSelector from '../components/LimitSelector';

export const initialTeams = [
  { id: 1, name: 'Team Alpha', coach: 'John Smith', school: 'Lincoln High School' },
  { id: 2, name: 'Team Beta', coach: 'Sarah Johnson', school: 'Washington Academy' },
  { id: 3, name: 'Team Gamma', coach: 'Mike Brown', school: 'Roosevelt High School' },
];

const teamColumns = [
  { key: 'name', label: 'Team Name' },
  { key: 'coach', label: 'Coach' },
  { key: 'school', label: 'School' },
];

const athleteColumns = [
  { key: 'name', label: 'Athlete Name' },
  { key: 'age', label: 'Age' },
  { key: 'sport', label: 'Sport' },
  { key: 'school', label: 'School' },
];

function Team() {
  const { athletes, setAthletes } = useAthletes();
  const { selectedSchool } = useSchools();
  const [teams, setTeams] = useState(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    coach: '',
    school: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTeam) {
      const updatedTeam = { ...formData, id: editingTeam.id };
      setTeams(teams.map(team =>
        team.id === editingTeam.id ? updatedTeam : team
      ));
      // Update team name for all athletes in this team
      setAthletes(athletes.map(athlete =>
        athlete.team === editingTeam.name ? { ...athlete, team: updatedTeam.name } : athlete
      ));
    } else {
      setTeams([...teams, { ...formData, id: teams.length + 1 }]);
    }
    setFormData({ name: '', coach: '', school: '' });
    setEditingTeam(null);
    setIsFormOpen(false);
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      coach: team.coach,
      school: team.school,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (teamToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${teamToDelete.name}? This will remove the team association from all athletes.`)) {
      // Remove team association from athletes
      setAthletes(athletes.map(athlete =>
        athlete.team === teamToDelete.name ? { ...athlete, team: '' } : athlete
      ));
      setTeams(teams.filter(team => team.id !== teamToDelete.id));
      if (selectedTeam?.id === teamToDelete.id) {
        setSelectedTeam(null);
      }
    }
  };

  const handleAddNewClick = () => {
    setEditingTeam(null);
    setFormData({ name: '', coach: '', school: '' });
    setIsFormOpen(true);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setSelectedAthlete(null);
    setShowDetailCard(false);
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

  // Filter teams based on selected school
  const filteredTeams = selectedSchool
    ? teams.filter(team => team.school === selectedSchool.name)
    : teams;

  // Filter athletes based on selected team
  const teamAthletes = selectedTeam
    ? athletes.filter(athlete => athlete.team === selectedTeam.name)
    : [];

  // Calculate paginated athletes
  const indexOfLastAthlete = currentPage * limit;
  const indexOfFirstAthlete = indexOfLastAthlete - limit;
  const paginatedAthletes = limit === 'All' ? teamAthletes : teamAthletes.slice(indexOfFirstAthlete, indexOfLastAthlete);
  const totalPages = limit === 'All' ? 1 : Math.ceil(teamAthletes.length / limit);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when limit changes
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Teams</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all teams in your organization including their name, coach, and school.
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

      <div className="mb-6">
        <SchoolSearch className="max-w-md" />
      </div>

      {isFormOpen && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{editingTeam ? 'Edit Team' : 'Add New Team'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                  Team Name
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
              <div className="mb-4">
                <label htmlFor="coach" className="block text-sm font-medium text-gray-800 mb-1">
                  Coach
                </label>
                <input
                  type="text"
                  name="coach"
                  id="coach"
                  value={formData.coach}
                  onChange={handleInputChange}
                  className="input-primary"
                  required
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
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {editingTeam ? 'Update Team' : 'Add Team'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div>
          <Table
            columns={teamColumns}
            data={filteredTeams}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRowClick={handleTeamSelect}
            selectedRow={selectedTeam}
          />
        </div>

        {selectedTeam && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{selectedTeam.name} Athletes</h2>
              <span className="text-sm text-gray-500">
                {teamAthletes.length} {teamAthletes.length === 1 ? 'Athlete' : 'Athletes'}
              </span>
            </div>
            {teamAthletes.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <LimitSelector limit={limit} onChange={handleLimitChange} />
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                <Table
                  columns={athleteColumns}
                  data={paginatedAthletes}
                  onRowClick={handleViewAthleteDetails}
                  hideActions
                />
                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No athletes assigned to this team
              </div>
            )}
          </div>
        )}
      </div>

      {showDetailCard && selectedAthlete && (
        <AthleteDetailCard
          athlete={selectedAthlete}
          onClose={() => {
            setSelectedAthlete(null);
            setShowDetailCard(false);
          }}
          onEdit={handleEditAthlete}
          onDelete={handleDeleteAthlete}
        />
      )}

      {editingAthlete && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Edit Athlete</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            setAthletes(athletes.map(a => a.id === editingAthlete.id ? { ...a, ...editingAthlete } : a));
            setEditingAthlete(null);
          }} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="mb-4">
                <label htmlFor="athlete-name" className="block text-sm font-medium text-gray-800 mb-1">
                  Athlete Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="athlete-name"
                  value={editingAthlete.name}
                  onChange={(e) => setEditingAthlete({ ...editingAthlete, name: e.target.value })}
                  className="input-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="athlete-age" className="block text-sm font-medium text-gray-800 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="athlete-age"
                  value={editingAthlete.age}
                  onChange={(e) => setEditingAthlete({ ...editingAthlete, age: Number(e.target.value) })}
                  className="input-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="athlete-sport" className="block text-sm font-medium text-gray-800 mb-1">
                  Sport
                </label>
                <input
                  type="text"
                  name="sport"
                  id="athlete-sport"
                  value={editingAthlete.sport}
                  onChange={(e) => setEditingAthlete({ ...editingAthlete, sport: e.target.value })}
                  className="input-primary"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setEditingAthlete(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Team;