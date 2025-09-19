import { ConfigProvider } from './context/configContext';
import { Button } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <Button variant="contained">Hello world</Button>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
