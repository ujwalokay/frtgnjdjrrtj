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
    demoStorageId?: string;
    user?: User;
  }
}

// In-memory storage for demo sessions (keyed by session ID)
const demoStorages = new Map<string, DemoStorage>();

// Middleware to inject session-scoped storage into every request (auto-demo mode)
export function demoMiddleware(req: Request, res: Response, next: NextFunction) {
  // Auto-initialize demo mode for all sessions
  if (!req.session) {
    console.error("Session not available in demoMiddleware");
    return next();
  }

  // Initialize demo storage if not already done
  if (!req.session.demoStorageId) {
    const storageId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    req.session.demoStorageId = storageId;
    req.session.isDemo = true;
    
    // Set default demo user (admin role for full access)
    req.session.user = {
      id: "guest-" + storageId,
      email: "guest@airavotogaming.com",
      firstName: "Guest",
      lastName: "User",
      profileImageUrl: null,
      username: "Guest",
      passwordHash: null,
      role: "admin", // Admin role for full access without auth
      onboardingCompleted: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    // userId is already in req.session.user.id
  }

  // Retrieve or create demo storage for this session
  if (!demoStorages.has(req.session.demoStorageId)) {
    demoStorages.set(req.session.demoStorageId, new DemoStorage());
  }
  
  req.storage = demoStorages.get(req.session.demoStorageId)!;
  req.isDemo = true;
  
  next();
}

// Route to enter demo mode
export function enterDemoMode(req: Request, res: Response) {
  if (!req.session) {
    return res.status(500).json({ message: "Session not available" });
  }
  
  // Create unique storage ID for this session
  const storageId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Create new demo storage for this session
  req.session.isDemo = true;
  req.session.demoStorageId = storageId;
  demoStorages.set(storageId, new DemoStorage());
  
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
  
  // Clean up demo storage
  if (req.session.demoStorageId) {
    demoStorages.delete(req.session.demoStorageId);
  }
  
  req.session.isDemo = false;
  req.session.demoStorageId = undefined;
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
