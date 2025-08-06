import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddLists from './pages/AddLists';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddLists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
