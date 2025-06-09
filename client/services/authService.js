const url = 'http://localhost:5000';

const registerUser = async (username, password) => {  
  const res = await fetch(`${url}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    console.error('Registration failed');
    return res.json();
  }
  return res.json();
};

const loginUser = async (username, password) => {
  const res = await fetch(`${url}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    console.error('Login failed');
    return res.json();
  }
  return res.json();
};

export { registerUser, loginUser };