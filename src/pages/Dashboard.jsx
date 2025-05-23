import { UsersIcon, UserGroupIcon, UserIcon, ChartBarIcon, TrophyIcon, FireIcon, HeartIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const stats = [
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
    { title: 'Total Athletes', value: '15', icon: UsersIcon },
    { title: 'Total Coaches', value: '5', icon: AcademicCapIcon },
    { title: 'Total Schools', value: '20', icon: AcademicCapIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold text-amber-600">Welcome to MOTIVE</h1>
        <p className="mt-1  text-amber-600">
          Track, train, and transform with your athletes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
                {/* <span className="block text-sm text-gray-600 mt-1">{action.description}</span> */}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 