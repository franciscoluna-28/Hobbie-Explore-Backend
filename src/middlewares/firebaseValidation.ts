import admin from "../config/firebase-config";
import { NextFunction, Request, Response } from "express";

// Middleware for Firebase
class FirebaseMiddleware {
  async decodeToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      // No se proporcionó ningún token en el encabezado de autorización
      return res.status(401).json({ message: "Unauthorized! Token missing" });
    }

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);

      if (decodeValue) {
        return next();
      }

      return res.status(401).json({ message: "Unauthorized! Invalid token" });
    } catch (error) {
      console.error("Error decoding token:", error);
      return res.status(500).json({ message: "Internal error" });
    }
  }
}

export default FirebaseMiddleware;
