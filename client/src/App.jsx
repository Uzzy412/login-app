import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import Profile from "../pages/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { ProfileProvider } from "../contexts/profileContext.jsx";

function App() {
  return (
    <Router>
      <Header />
      <ProfileProvider>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </ProfileProvider>
    </Router>
  )
}

export default App
