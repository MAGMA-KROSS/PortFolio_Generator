import { Request, Response, NextFunction } from "express";

// roles: array of allowed roles for this route
export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // req.user should be set by authMiddleware
    const user = (req as any).user;

    if (!user || !user.role) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Access denied: insufficient role" });
    }

    // User has required role, continue
    next();
  };
};
