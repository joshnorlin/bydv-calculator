import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return ( // keep header fixed; increase z-index; set consistent height
    <header className={`bg-black top-0 left-0 w-full fixed z-50 transition-all duration-300 ${scrolled ? 'header-scrolled' : 'header-transparent'} flex items-center h-16`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <div className="flex items-center h-full">
          <img 
            src="/src/assets/images/bydv_logo_v1.png" 
            alt="BYDV Logo" 
            className="h-12 object-contain" 
            onError={(e) => {
              // Fallback in case the image doesn't load
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDNjMS42NiAwIDMgMS4zNCAzIDNzLTEuMzQgMy0zIDMtMy0xLjM0LTMtMyAxLjM0LTMgMy0zem0wIDE0LjJjLTIuNSAwLTQuNzEtMS4yOC02LTMuMjIuMDMtMS45OSA0LTMuMDggNi0zLjA4IDEuOTkgMCA1Ljk3IDEuMSA2IDMuMDgtMS4yOSAxLjk0LTMuNSAzLjIyLTYgMy4yMnoiLz48L3N2Zz4=';
            }}
          />
          <Link to="/" className="ml-3 text-2xl font-bold text-white hover:no-underline">
            <span className="border-b-4 border-teal-400">Small Grains BYDV</span>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link to="/" className="text-white hover:text-teal-300">Home</Link></li>
            <li><Link to="/about" className="text-white hover:text-teal-300">About</Link></li>
            <li><Link to="/team" className="text-white hover:text-teal-300">Team</Link></li>
            <li><Link to="/contact" className="text-white hover:text-teal-300">Contact</Link></li>
            <li><Link to="/calculator" className="text-white hover:text-teal-300">Calculator</Link></li>
          </ul>
        </nav>

        <button className="md:hidden text-2xl text-white">
          <i className="bi bi-list"></i>
        </button>
      </div>
    </header>
  );
}
