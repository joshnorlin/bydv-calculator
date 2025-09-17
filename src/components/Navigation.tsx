import { Link } from 'react-router-dom';

function Navigation() {
  
  const navItems = [
    { path: '/calculator', label: 'Standard', icon: '🧮' },
    { path: '/calculator/quick', label: 'Quick Calculate', icon: '⚡' },
    { path: '/calculator/results', label: 'Results', icon: '📊' },
    { path: '/calculator/about', label: 'About', icon: 'ℹ️' },
    { path: '/calculator/help', label: 'Help', icon: '❓' },
  ];

  // Styling removed; active state is not used for visual purposes.

  return (
    <nav>
      <div>
        <div>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
