// Mock data generator for fitness app

// Helper function to generate random IDs
const generateRandomId = () => Math.random().toString(36).substr(2, 9);

// Lists for generating random data
const firstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Sarah', 'Emma', 'Olivia', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Ava', 'Emily', 'Sofia', 'Luna', 'Camila', 'Maya', 'Layla'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const sports = ['Basketball', 'Swimming', 'Track & Field', 'Soccer', 'Volleyball', 'Tennis', 'Baseball', 'Football', 'Cross Country', 'Wrestling'];
const schools = [
  { name: 'Central High School', location: 'Springfield, IL' },
  { name: 'Riverside Prep Academy', location: 'Riverside, CA' },
  { name: 'Eastview Academy', location: 'Boston, MA' },
  { name: 'Western High School', location: 'Denver, CO' }
];
const specializations = [...sports, 'Strength Training', 'Conditioning', 'Sports Medicine', 'Performance Analysis'];

// Helper function to generate a random integer within a range
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random phone numbers
const generatePhone = () => `(${randomInt(100, 999)}) ${randomInt(100, 999)}-${randomInt(1000, 9999)}`;

// Helper function to generate a random email
const generateEmail = (name) => {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  const domains = ['example.com', 'school.edu', 'athletics.org', 'sports.net'];
  return `${cleanName}@${domains[randomInt(0, domains.length - 1)]}`;
};

// Generate mock athlete data
const generateAthlete = (teamName, sport, school) => {
  const firstName = firstNames[randomInt(0, firstNames.length - 1)];
  const lastName = lastNames[randomInt(0, lastNames.length - 1)];
  const name = `${firstName} ${lastName}`;
  
  return {
    id: generateRandomId(),
    name,
    email: generateEmail(name),
    phone: generatePhone(),
    age: randomInt(14, 18),
    grade: randomInt(9, 12),
    sport,
    team: teamName,
    school,
    profilePicture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${randomInt(1, 70)}.jpg`,
    performance: {
      strength: randomInt(60, 100),
      speed: randomInt(60, 100),
      endurance: randomInt(60, 100),
      agility: randomInt(60, 100),
      attendance: randomInt(80, 100),
      recentProgress: randomInt(-10, 10)
    }
  };
};

// Generate mock coach data
const generateCoach = (teamName, sport, school) => {
  const firstName = firstNames[randomInt(0, firstNames.length - 1)];
  const lastName = lastNames[randomInt(0, lastNames.length - 1)];
  const name = `${firstName} ${lastName}`;
  const specialization = specializations[randomInt(0, specializations.length - 1)];
  
  return {
    id: generateRandomId(),
    name,
    email: generateEmail(name),
    phone: generatePhone(),
    team: teamName,
    experience: `${randomInt(5, 25)} years`,
    specialization,
    school,
    profilePicture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${randomInt(1, 70)}.jpg`,
    achievements: [
      'Regional Championship 2022',
      'Coach of the Year 2021',
      'State Finals 2020'
    ].slice(0, randomInt(1, 3))
  };
};

// Generate mock team data
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

// Generate mock school data
const generateSchool = (schoolInfo) => {
  const schoolSports = sports.slice(0, randomInt(3, 5)); // 3-5 sports per school
  return {
    id: generateRandomId(),
    name: schoolInfo.name,
    location: schoolInfo.location,
    teams: schoolSports.map(sport => generateTeam(schoolInfo.name, sport))
  };
};

// Generate all mock data
export const generateMockData = () => ({
  schools: schools.map(generateSchool)
});

// Helper functions to get all entities
export const getAllAthletes = (mockData) => 
  mockData.schools.flatMap(school => 
    school.teams.flatMap(team => team.athletes)
  );

export const getAllCoaches = (mockData) => 
  mockData.schools.flatMap(school => 
    school.teams.flatMap(team => team.coaches)
  );

export const getAllTeams = (mockData) => 
  mockData.schools.flatMap(school => school.teams);

// Filter helpers
export const getSchoolTeams = (mockData, schoolName) => 
  mockData.schools
    .find(school => school.name === schoolName)?.teams || [];

export const getTeamAthletes = (mockData, teamName) => 
  getAllAthletes(mockData).filter(athlete => athlete.team === teamName);

export const getTeamCoaches = (mockData, teamName) =>
  getAllCoaches(mockData).filter(coach => coach.team === teamName);

export const getSchoolAthletes = (mockData, schoolName) =>
  getAllAthletes(mockData).filter(athlete => athlete.school === schoolName);

export const getSchoolCoaches = (mockData, schoolName) =>
  getAllCoaches(mockData).filter(coach => coach.school === schoolName);

// Generate initial mock data
export const mockData = generateMockData();

export default mockData;
