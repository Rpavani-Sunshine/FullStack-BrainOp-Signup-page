import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignupForm from './Components/SignupForm';
import PostList from './Components/PostList';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
