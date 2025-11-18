import { Request, Response, NextFunction } from "express";
import { DemoStorage } from "./demo-storage";
import { storage as productionStorage } from "./storage";
import type { IStorage } from "./storage";
import type { User } from "@shared/schema";

declare global {
  namespace Express {
    interface Request {
      storage: IStorage;
      isDemo: boolean;
    }
  }
}

// Extend session data
declare module "express-session" {
  interface SessionData {
    isDemo?: boolean;
    demoStorage?: DemoStorage;
    user?: User;
    userId?: string;
  }
}

// Middleware to inject demo storage into request if in demo mode
export function demoMiddleware(req: Request, res: Response, next: NextFunction) {
  // Check if this is a demo session
  const isDemo = req.session?.isDemo === true;
  
  if (isDemo) {
    // Create or retrieve demo storage for this session
    if (!req.session.demoStorage) {
      req.session.demoStorage = new DemoStorage();
    }
    req.storage = req.session.demoStorage;
    req.isDemo = true;
  } else {
    // Use production storage
    req.storage = productionStorage;
    req.isDemo = false;
  }
  
  next();
}

// Route to enter demo mode
export function enterDemoMode(req: Request, res: Response) {
  if (!req.session) {
    return res.status(500).json({ message: "Session not available" });
  }
  
  // Create new demo storage for this session
  req.session.isDemo = true;
  req.session.demoStorage = new DemoStorage();
  
  // Set demo user in session
  req.session.user = {
    id: "demo-user-id",
    email: "demo@airavotogaming.com",
    firstName: "Demo",
    lastName: "User",
    profileImageUrl: null,
    username: "demo",
    passwordHash: null,
    role: "staff",
    onboardingCompleted: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.json({ 
    success: true, 
    message: "Demo mode activated",
    user: req.session.user
  });
}

// Route to exit demo mode
export function exitDemoMode(req: Request, res: Response) {
  if (!req.session) {
    return res.status(500).json({ message: "Session not available" });
  }
  
  req.session.isDemo = false;
  req.session.demoStorage = undefined;
  req.session.user = undefined;
  
  res.json({ success: true, message: "Demo mode exited" });
}

// Check if current session is in demo mode
export function checkDemoMode(req: Request, res: Response) {
  const isDemo = req.session?.isDemo === true;
  const user = req.session?.user;
  
  res.json({ 
    isDemo,
    user: isDemo ? user : null
  });
}
