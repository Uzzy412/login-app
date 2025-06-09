import express from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import cors from 'cors';

const users = [

];

const SECRET_KEY = 'my_secrete_key';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(password, 10);

  users.push({ username, password: hashedPass });

  res.status(201).json({ success: true, message: 'New user created!', users});
});


// login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  const isPassValid = await bcryptjs.compare(password, user.password);
  if (!isPassValid) return res.status(404).json(
    { success: false, message: 'Invalid password' }
  );

  const payload = { username };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  res.status(200).json({ token, success: true, message: 'Logged in successfully!' });
});


// login middleware
const loginMiddleware = async (req, res, next) => {
  const authorization = req.headers['authorization'];
  const token = authorization && authorization.split(' ')[1];

  if (!token) return res.status(404).json(
    { success: false, message: 'Inexistent or invalid token'}
  );

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json(
      { success: false, message: 'Something wrong with token'}
    );

    req.user = user;
    next();
  });
};

app.get('/profile', loginMiddleware, (req, res) => {
  const { user } = req.body;
  res.json({ success: true, message: `Welcome, ${user}!` });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})