const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email
    };
    next();
  } catch (error) {
  return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;