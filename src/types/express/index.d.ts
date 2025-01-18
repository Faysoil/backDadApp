import { JwtPayload } from "../middleware/authMiddleware";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Ajout de la propriété `user`
    }
  }
}