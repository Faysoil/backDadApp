import jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET non défini dans le fichier .env');
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export default { generateToken };
