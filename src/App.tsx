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
              <main>
                <LandingPage />
              </main>
            } />
            <Route path="/calculator" element={
              <div>
                <Navigation />
                <div>
                  <HomePage />
                </div>
              </div>
            } />
            <Route path="/calculator/quick" element={
              <div>
                <Navigation />
                <div>
                  <QuickCalculate />
                </div>
              </div>
            } />
            <Route path="/calculator/results" element={
              <div>
                <Navigation />
                <div>
                  <ResultsPage />
                </div>
              </div>
            } />
            <Route path="/calculator/about" element={
              <div>
                <Navigation />
                <div>
                  <AboutPage />
                </div>
              </div>
            } />
            <Route path="/calculator/help" element={
              <div>
                <Navigation />
                <div>
                  <HelpPage />
                </div>
              </div>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <footer>
            &copy; {new Date().getFullYear()} Idaho Wheat Calculator
          </footer>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
