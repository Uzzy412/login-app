import logo from '../src/images/login.png';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="logo" />
      <h1>Login App</h1>
    </header>
  );
}