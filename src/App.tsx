import { ConfigProvider } from './context/configContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Home } from './pages/home';
import { CalculatorHome } from './pages/calculator/calculatorHome';
import { Recommendations } from './pages/calculator/recommendations';

function App() {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ConfigProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<CalculatorHome />} />
                  <Route path="/recommendations" element={<Recommendations />} />
              </Routes>
            </BrowserRouter>
          </ConfigProvider>
        </PersistGate>
      </Provider>
  );
}

export default App;
