import { ConfigProvider } from './context/configContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Home } from './pages/home';
import About from './pages/about';
import { CalculatorHome } from './pages/calculator/calculatorHome';
import { RecommendationsPage } from './pages/calculator/recommendations';
import { MainHeader } from './components/MainHeader';
import { ScrollToTop } from './components/ScrollToTop';
import CalculatorLayout from "./CalculatorLayout";

export const mainPages = [
  "home",
  "calculator",
  "about"
]

export const calculatorSubPages = [
  "calculator",
  "recommendations",
  "about"
]

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ConfigProvider>
          <BrowserRouter>
            <ScrollToTop />
            <MainHeader />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* Layout route for calculator */}
              <Route path="/calculator" element={<CalculatorLayout />}>
                <Route index element={<CalculatorHome />} />  {/* /calculator */}
                <Route path="recommendations" element={<RecommendationsPage />} />
                <Route path="about" element={<About />} />
                {/* add quick-calculate page here */}
              </Route>

            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}


export default App;
