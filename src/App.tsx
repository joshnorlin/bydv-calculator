import { ConfigProvider } from './context/configContext';
import { Button } from '@mui/material';

import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ConfigProvider>
          <Button variant="contained">Hello world</Button>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
