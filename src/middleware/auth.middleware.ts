import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

// // Extend Express Request interface to include 'user'
// declare global {
//     namespace Express {
//         interface Request {
//             user?: any;
//         }
//     }
// }

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
}