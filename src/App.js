

import './App.css';
import MainLayout from './component/MainLayout';
import Router from './router';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Router/>
      </MainLayout>
    </div>
  );
}

export default App;
