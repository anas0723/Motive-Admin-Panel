import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { UsersIcon, UserGroupIcon, UserIcon, ChartBarIcon, TrophyIcon, FireIcon, HeartIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAthletes } from '../context/AthletesContext';

// Rename this to statsData to avoid naming conflict
const statsData = [
  { name: 'Active Athletes', value: '48', icon: UserGroupIcon, change: '+8', changeType: 'increase', color: 'from-blue-500 to-blue-600' },
  { name: 'Workouts Completed', value: '156', icon: FireIcon, change: '+23', changeType: 'increase', color: 'from-orange-500 to-orange-600' },
  { name: 'Success Rate', value: '92%', icon: TrophyIcon, change: '+5%', changeType: 'increase', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Avg. Performance', value: '8.5', icon: HeartIcon, change: '+0.3', changeType: 'increase', color: 'from-red-500 to-red-600' },
];

const recentActivities = [
  { type: 'workout', name: 'John Doe', action: 'completed a HIIT session', time: '2 hours ago', icon: FireIcon },
  { type: 'achievement', name: 'Sarah Smith', action: 'reached a new personal best', time: '3 hours ago', icon: TrophyIcon },
  { type: 'training', name: 'Mike Johnson', action: 'started a new training program', time: '5 hours ago', icon: ClockIcon },
];

function Dashboard() {
  const navigate = useNavigate();
  const { athletes } = useAthletes();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const quickActions = [
    {
      name: 'Add New Team',
      description: 'Create a new team.',
      icon: UserGroupIcon,
      onClick: () => handleNavigation('/team'),
      color: 'blue',
    },
    {
      name: 'Add New Athlete',
      description: 'Register a new athlete.',
      icon: UsersIcon,
      onClick: () => handleNavigation('/athlete'),
      color: 'orange',
    },
    {
      name: 'Add New Coach',
      description: 'Onboard a new coach.',
      icon: AcademicCapIcon,
      onClick: () => handleNavigation('/coach'),
      color: 'yellow',
    },
    {
      name: 'Manage Schools',
      description: 'View and manage schools.',
      icon: AcademicCapIcon,
      onClick: () => handleNavigation('/school'),
      color: 'green',
    },
  ];

  const summaryCards = [
    { title: 'Total Teams', value: '3', icon: UserGroupIcon },
    { title: 'Total Athletes', value: athletes.length.toString(), icon: UsersIcon },
    { title: 'Total Coaches', value: '5', icon: AcademicCapIcon },
    { title: 'Total Schools', value: '20', icon: AcademicCapIcon },
  ];

  // Mock data
  const [stats, setStats] = useState({
    totalAthletes: 156,
    totalCoaches: 23,
    totalTeams: 12,
    totalSchools: 8,
  });

  const athletesPerTeam = [
    { name: 'Team A', count: 25 },
    { name: 'Team B', count: 18 },
    { name: 'Team C', count: 32 },
    { name: 'Team D', count: 15 },
  ];

  const sportsDistribution = [
    { name: 'Basketball', value: 40 },
    { name: 'Football', value: 30 },
    { name: 'Swimming', value: 20 },
    { name: 'Track', value: 10 },
  ];

  const COLORS = ['#0ea5e9', '#d946ef', '#22c55e', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold text-amber-600">Welcome to MOTIVE</h1>
        <p className="mt-1 text-amber-600">
          Track, train, and transform with your athletes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all duration-200 hover:shadow-md"
          >
            <dt>
              <div className={`absolute rounded-lg bg-gradient-to-r ${stat.color} p-3 text-white`}>
                <stat.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Recent Activity</h2>
          <div className="mt-6 space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-x-4">
                <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${activity.type === 'workout' ? 'from-orange-500 to-orange-600' : activity.type === 'achievement' ? 'from-yellow-500 to-yellow-600' : 'from-blue-500 to-blue-600'} flex items-center justify-center text-white`}>
                  <activity.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    <span className="font-semibold">{activity.name}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Quick Actions</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <button
                key={action.name}
                className={`relative block w-full rounded-lg bg-white p-6 text-center shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-${action.color}-500 focus:ring-offset-2 border-t-4 border-${action.color}-500`}
                onClick={action.onClick}
              >
                <span className="block text-base font-semibold text-gray-900">{action.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <h3 className="text-lg font-medium">Total Athletes</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalAthletes}</p>
        </Card>
        <Card className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white">
          <h3 className="text-lg font-medium">Total Coaches</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalCoaches}</p>
        </Card>
        <Card className="bg-gradient-to-br from-success-500 to-success-600 text-white">
          <h3 className="text-lg font-medium">Total Teams</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalTeams}</p>
        </Card>
        <Card className="bg-gradient-to-br from-warning-500 to-warning-600 text-white">
          <h3 className="text-lg font-medium">Total Schools</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalSchools}</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium mb-4">Athletes per Team</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={athletesPerTeam}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-4">Sports Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sportsDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sportsDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard; 