// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { AppBoard } from './components/AppBoard/AppBoard';

export function App() {
  return (
      <Routes>
        <Route
          path="/"
          element={
            <AppBoard/>
          }
        />
      </Routes>
  );
}

export default App;
