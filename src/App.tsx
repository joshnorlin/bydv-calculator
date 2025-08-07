import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/visualComponents/Header';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col">
        <Header />
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </main>
        <footer className="text-center text-gray-400 py-4 text-sm">
          &copy; {new Date().getFullYear()} Idaho Wheat Calculator
        </footer>
      </div>
    </Router>
  );
}

export default App;
