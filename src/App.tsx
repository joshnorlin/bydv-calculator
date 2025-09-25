import { ConfigProvider } from './context/configContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Home } from './pages/home';
import { CalculatorHome } from './pages/calculator/calculatorHome';
import { RecommendationsPage } from './pages/calculator/recommendations';
import { MainHeader } from './components/MainHeader';
import CalculatorLayout from "./CalculatorLayout";

export const mainPages = [
  "home",
  "calculator",
  "about",
  "community"
]

export const calculatorSubPages = [
  "calculator",
  "recommendations",
  "help",
  "about"
  // potentially a home page.
]

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ConfigProvider>
          <BrowserRouter>
            <MainHeader />
            <Routes>
              <Route path="/home" element={<Home />} />

              {/* Layout route for calculator */}
              <Route path="/calculator" element={<CalculatorLayout />}>
                <Route index element={<CalculatorHome />} />  {/* /calculator */}
                <Route path="recommendations" element={<RecommendationsPage />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}


export default App;
