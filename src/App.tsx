import { ConfigProvider } from './context/configContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Home } from './pages/home';
import { CalculatorHome } from './pages/calculator/calculatorHome';
import { RecommendationsPage } from './pages/calculator/recommendations';
import { Header } from './components/Header';

export const pages = [
  "home",
  "calculator",
  "about",
  "community"
]

function App() {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ConfigProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/calculator" element={<CalculatorHome />} />
                  <Route path="/recommendations" element={<RecommendationsPage />} />
              </Routes>
            </BrowserRouter>
          </ConfigProvider>
        </PersistGate>
      </Provider>
  );
}

export default App;
