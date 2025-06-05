import { useState, useEffect, useMemo } from 'react';
import Card from '../components/ui/Card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { UsersIcon, UserGroupIcon, UserIcon, ChartBarIcon, TrophyIcon, FireIcon, HeartIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useAthletes } from '../context/AthletesContext';
import { useSchools } from '../context/SchoolsContext';
import { getAllAthletes, getAllCoaches, getAllTeams } from '../data/mockDataGenerator';

function Dashboard() {
  const navigate = useNavigate();
  const { athletes } = useAthletes();
  const { schools } = useSchools();

  // Calculate dashboard statistics from mock data
  const dashboardStats = useMemo(() => {
    const allAthletes = getAllAthletes({ schools });
    const allTeams = getAllTeams({ schools });
    const allCoaches = getAllCoaches({ schools });

    const totalAthletes = allAthletes.length;
    const avgPerformance = allAthletes.reduce((sum, athlete) => 
      sum + (athlete.performance.strength + athlete.performance.speed + athlete.performance.endurance + athlete.performance.agility) / 4, 0
    ) / totalAthletes;
    
    const avgAttendance = allAthletes.reduce((sum, athlete) => 
      sum + athlete.performance.attendance, 0
    ) / totalAthletes;

    const positiveProgress = allAthletes.filter(a => a.performance.recentProgress > 0).length;
    const progressRate = (positiveProgress / totalAthletes) * 100;

    return [
      { 
        name: 'Active Athletes', 
        value: totalAthletes, 
        icon: UserGroupIcon, 
        change: '+12', 
        changeType: 'increase', 
        color: 'from-blue-500 to-blue-600' 
      },
      { 
        name: 'Teams', 
        value: allTeams.length, 
        icon: UserIcon, 
        change: '+3', 
        changeType: 'increase', 
        color: 'from-green-500 to-green-600' 
      },
      { 
        name: 'Avg. Attendance', 
        value: `${Math.round(avgAttendance)}%`, 
        icon: ClockIcon, 
        change: '+5%', 
        changeType: 'increase', 
        color: 'from-yellow-500 to-yellow-600' 
      },
      { 
        name: 'Progress Rate', 
        value: `${Math.round(progressRate)}%`, 
        icon: ChartBarIcon, 
        change: '+8%', 
        changeType: 'increase', 
        color: 'from-purple-500 to-purple-600' 
      },
    ];
  }, [schools]);

  // Performance data for charts
  const performanceData = useMemo(() => {
    const allAthletes = getAllAthletes({ schools });
    return allAthletes.map(athlete => ({
      name: athlete.name.split(' ')[0],
      performance: (
        athlete.performance.strength +
        athlete.performance.speed +
        athlete.performance.endurance +
        athlete.performance.agility
      ) / 4,
      attendance: athlete.performance.attendance,
      progress: athlete.performance.recentProgress
    })).slice(0, 10); // Show top 10 athletes
  }, [schools]);

  // Recent activities based on mock data
  const recentActivities = useMemo(() => {
    const allAthletes = getAllAthletes({ schools });
    return allAthletes
      .filter(athlete => athlete.performance.recentProgress !== 0)
      .map(athlete => ({
        type: athlete.performance.recentProgress > 0 ? 'achievement' : 'training',
        name: athlete.name,
        action: athlete.performance.recentProgress > 0 
          ? 'improved overall performance'
          : 'started new training program',
        time: '2 hours ago',
        icon: athlete.performance.recentProgress > 0 ? TrophyIcon : ClockIcon
      }))
      .slice(0, 5); // Show last 5 activities
  }, [schools]);

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
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <Card key={stat.name} className="relative overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-r opacity-10 pointer-events-none" />
            <div className="p-6">
              <div className="flex items-center">
                <div className={`rounded-lg p-3 bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{stat.name}</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className={`text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">from last month</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="performance" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Progress Tracking */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Tracking</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {recentActivities.map((activity, index) => (
              <li key={index}>
                <div className="relative pb-8">
                  {index < recentActivities.length - 1 && (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  )}
                  <div className="relative flex space-x-3">
                    <div className={`${
                      activity.type === 'achievement' ? 'bg-yellow-100' : 'bg-blue-100'
                    } h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}>
                      <activity.icon className={`h-5 w-5 ${
                        activity.type === 'achievement' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{activity.name}</span>
                          {' '}{activity.action}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        <time dateTime={activity.time}>{activity.time}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      
      {/* Quick Actions Moved to Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <Card 
            key={action.name}
            className="p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            onClick={action.onClick}
          >
            <div className={`inline-flex p-3 rounded-lg text-${action.color}-600 bg-${action.color}-100 ring-4 ring-${action.color}-50`}>
              <action.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{action.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{action.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;