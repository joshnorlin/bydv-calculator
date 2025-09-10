import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from './context/configContext';
import Header from './components/visualComponents/Header';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import LandingPage from './pages/LandingPage';
import QuickCalculate from './pages/QuickCalculate'

function App() {
  return (
    <ConfigProvider>
      <Router>
        <ScrollToTop />
        <div data-aos-easing="ease-in-out" data-aos-duration="1000" data-aos-delay="0">
        {/* do we have to add "relative" to the div above? ^^^ */}
          <Header />
          <Routes>
          {/* refactor routes to be array.map function. */}
            <Route path="/" element={
              <main className="flex-1 pt-16">
                <LandingPage />
              </main>
            } />
            <Route path="/calculator" element={
              <div className="min-h-screen">
                <Navigation />
                <div className="pt-[112px] pb-8">
                  <HomePage />
                </div>
              </div>
            } />
            <Route path="/calculator/quick" element={
              <div className="min-h-screen">
                <Navigation />
                <div className="pt-[112px] pb-8">
                  <QuickCalculate />
                </div>
              </div>
            } />
            <Route path="/calculator/results" element={
              <div className="min-h-screen">
                <Navigation />
                <div className="pt-[112px] pb-8">
                  <ResultsPage />
                </div>
              </div>
            } />
            <Route path="/calculator/about" element={
              <div className="min-h-screen">
                <Navigation />
                <div className="pt-[112px] pb-8">
                  <AboutPage />
                </div>
              </div>
            } />
            <Route path="/calculator/help" element={
              <div className="min-h-screen">
                <Navigation />
                <div className="pt-[112px] pb-8">
                  <HelpPage />
                </div>
              </div>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <footer className="text-center text-gray-400 py-4 text-sm">
            &copy; {new Date().getFullYear()} Idaho Wheat Calculator
          </footer>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
