import auth from '../utlis/auth.js';



const verifyAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No Token Found' });
    }

    const token = authHeader.split(' ')[1];
    const payload = auth.decodeToken(token);

    const currentTime = Math.floor(Date.now() / 1000);  // Convert milliseconds to seconds
    if (payload.exp && payload.exp <= currentTime) {
      return res.status(401).json({ message: 'Session Expired' });
    }

    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    console.log("verification")
    next();
  } catch (error) {
    console.error('Error in verifyAuth middleware:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default verifyAuth;
