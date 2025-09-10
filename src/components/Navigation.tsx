import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  // Get the current path and remove trailing slashes for comparison
  const currentPath = location.pathname.replace(/\/+$/, '');
  
  const navItems = [
    { path: '/calculator', label: 'Standard', icon: '🧮' },
    { path: '/calculator/quick', label: 'Quick Calculate', icon: '⚡' },
    { path: '/calculator/results', label: 'Results', icon: '📊' },
    { path: '/calculator/about', label: 'About', icon: 'ℹ️' },
    { path: '/calculator/help', label: 'Help', icon: '❓' },
  ];

  // Check if the current path matches the nav item
  const isActive = (path: string) => {
    const cleanPath = path.replace(/\/+$/, '');
    return currentPath === cleanPath || 
           (path === '/calculator' && currentPath === '/calculator');
  };

  return (
    <nav className="fixed top-16 left-0 right-0 z-40 w-full bg-white shadow-sm border-b border-gray-200 h-12 flex items-end"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                isActive(item.path)
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
