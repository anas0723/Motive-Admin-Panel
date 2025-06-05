// Mock data generator
const generateRandomId = () => Math.floor(Math.random() * 10000);

// List of sports
const sports = ['Basketball', 'Football', 'Swimming', 'Track', 'Soccer', 'Tennis'];

// Generate mock athlete
const generateAthlete = (teamName, sport, school) => ({
  id: generateRandomId(),
  name: `${['John', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa'][Math.floor(Math.random() * 6)]} ${
    ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'][Math.floor(Math.random() * 6)]
  }`,
  age: Math.floor(Math.random() * 10) + 15, // Ages 15-24
  email: `athlete${generateRandomId()}@example.com`,
  phone: `(555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
  sport,
  team: teamName,
  school,
  profilePicture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`,
  performance: {
    averageScore: Math.floor(Math.random() * 30) + 70, // 70-99
    attendance: Math.floor(Math.random() * 20) + 80, // 80-99
    improvement: Math.floor(Math.random() * 40) + 60, // 60-99
  }
});

// Generate mock coach
const generateCoach = (teamName, sport, school) => ({
  id: generateRandomId(),
  name: `${['Robert', 'Mary', 'James', 'Patricia', 'Michael', 'Jennifer'][Math.floor(Math.random() * 6)]} ${
    ['Wilson', 'Anderson', 'Taylor', 'Thomas', 'Martinez', 'Robinson'][Math.floor(Math.random() * 6)]
  }`,
  email: `coach${generateRandomId()}@example.com`,
  phone: `(555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
  team: teamName,
  sport,
  school,
  experience: `${Math.floor(Math.random() * 15) + 5} years`, // 5-20 years
  specialization: sport,
  profilePicture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`,
});

// Generate mock team
const generateTeam = (schoolName, sport) => {
  const teamName = `${schoolName} ${sport}`;
  return {
    id: generateRandomId(),
    name: teamName,
    sport,
    school: schoolName,
    athletes: Array(10).fill(null).map(() => generateAthlete(teamName, sport, schoolName)),
    coaches: Array(3).fill(null).map(() => generateCoach(teamName, sport, schoolName))
  };
};

// Generate mock school
const generateSchool = (name, location) => {
  const schoolSports = sports.slice(0, Math.floor(Math.random() * 3) + 2); // 2-4 sports per school
  return {
    id: generateRandomId(),
    name,
    location,
    teams: schoolSports.map(sport => generateTeam(name, sport))
  };
};

// Generate all mock data
export const mockData = {
  schools: [
    generateSchool('Central High', 'Springfield, IL'),
    generateSchool('Riverside Prep', 'Riverside, CA'),
    generateSchool('Eastview Academy', 'Boston, MA'),
    generateSchool('Western High', 'Denver, CO')
  ]
};

// Helper function to get all athletes
export const getAllAthletes = () => 
  mockData.schools.flatMap(school => 
    school.teams.flatMap(team => team.athletes)
  );

// Helper function to get all coaches
export const getAllCoaches = () => 
  mockData.schools.flatMap(school => 
    school.teams.flatMap(team => team.coaches)
  );

// Helper function to get all teams
export const getAllTeams = () => 
  mockData.schools.flatMap(school => school.teams);

export default mockData;
