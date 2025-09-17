import { Link, useLocation, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/calculator', label: 'Standard', icon: '🧮' },
    { path: '/calculator/quick', label: 'Quick Calculate', icon: '⚡' },
    { path: '/calculator/results', label: 'Results', icon: '📊' },
    { path: '/calculator/about', label: 'About', icon: 'ℹ️' },
    { path: '/calculator/help', label: 'Help', icon: '❓' },
  ];

  // Current tab value equals the path of the closest matching item
  const currentValue = navItems.find(item => location.pathname.startsWith(item.path))?.path || false;

  return (
    <Box component="nav" sx={{ position: 'fixed', top: 64, left: 0, right: 0, bgcolor: 'background.paper', zIndex: (t) => t.zIndex.appBar - 1, borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Tabs
          value={currentValue}
          onChange={(_, newValue) => { if (newValue) navigate(newValue); }}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Calculator navigation"
        >
          {navItems.map((item) => (
            <Tab
              key={item.path}
              label={`${item.icon} ${item.label}`}
              value={item.path}
              component={Link}
              to={item.path}
            />
          ))}
        </Tabs>
      </Container>
    </Box>
  );
}

export default Navigation;
