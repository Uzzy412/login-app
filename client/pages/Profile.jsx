import { ProfileContext } from "../contexts/profileContext";
import { useContext } from 'react';
import { useNavigate } from 'react-router';

export default function Profile() {
  const { user, logout } = useContext(ProfileContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmation = confirm('Are you sure you wanna logout?');
    if (confirmation) {
      logout();
      navigate('/');
    }
  };

  return (
    <>
      <h1 className="greeting">Hello, {user.user || 'Guest'}!</h1>
      <button onClick={handleLogout} className="login-btn logout-btn">Logout</button>
    </>
  );
}