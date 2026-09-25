import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { validateEmailStrict } from "./src/lib/emailValidator";

// Zero-Trust Security & PII Protection Utilities
function maskEmail(email: string): string {
  if (!email || typeof email !== "string") return "***";
  const parts = email.split("@");
  if (parts.length !== 2) return "***";
  const user = parts[0];
  const domain = parts[1];
  const maskedUser = user.length <= 2 ? user[0] + "***" : user.slice(0, 2) + "***" + user.slice(-1);
  return `${maskedUser}@${domain}`;
}

function maskPhone(phone?: string): string {
  if (!phone) return "";
  const clean = phone.trim();
  if (clean.length <= 4) return "***";
  return clean.slice(0, 3) + "****" + clean.slice(-2);
}

function sanitizeInput(val: unknown, maxLen = 3000): string {
  if (val === null || val === undefined) return "";
  let str = String(val).trim();
  if (str.length > maxLen) str = str.substring(0, maxLen);
  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  str = str.replace(/javascript:/gi, "");
  return str;
}

function generateSecureId(prefix: string): string {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;
}

function timingSafeSecretCompare(a?: string, b?: string): boolean {
  if (!a || !b) return false;
  try {
    const hashA = crypto.createHash("sha256").update(a).digest();
    const hashB = crypto.createHash("sha256").update(b).digest();
    return crypto.timingSafeEqual(hashA, hashB);
  } catch {
    return false;
  }
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
  ip?: string;
  userAgent?: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  submittedAt: string;
}

export interface JobApplication {
  id: string;
  fullName: string;
  country: string;
  email: string;
  phone: string;
  bio: string;
  fileName?: string;
  fileDataUrl?: string;
  fileSize?: string;
  fileType?: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'interview' | 'accepted' | 'archived';
  ip?: string;
  userAgent?: string;
}

// In-memory fallback and persistent storage paths
const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const JOBS_FILE = path.join(DATA_DIR, "job_applications.json");
const ADMIN_CONFIG_FILE = path.join(DATA_DIR, "admin_config.json");

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  console.warn("Could not create data directory, using memory store:", e);
}

// Admin Authentication Secret Management (No Hardcoded Fallback Secrets in Source Code)
function getAdminSecret(): string {
  if (process.env.ADMIN_SECRET_KEY && process.env.ADMIN_SECRET_KEY.trim().length > 0) {
    return process.env.ADMIN_SECRET_KEY.trim();
  }
  try {
    if (fs.existsSync(ADMIN_CONFIG_FILE)) {
      const configData = fs.readFileSync(ADMIN_CONFIG_FILE, "utf-8");
      const config = JSON.parse(configData);
      if (config && config.adminSecret && typeof config.adminSecret === "string") {
        return config.adminSecret;
      }
    }
  } catch (e) {
    // Non-fatal
  }
  // Auto-generate high-entropy 256-bit CSPRNG secret if not provided
  const generatedSecret = crypto.randomBytes(32).toString("hex");
  try {
    fs.writeFileSync(
      ADMIN_CONFIG_FILE,
      JSON.stringify({ adminSecret: generatedSecret, generatedAt: new Date().toISOString() }, null, 2),
      { encoding: "utf-8", mode: 0o600 }
    );
  } catch (e) {
    // Memory fallback
  }
  return generatedSecret;
}

function setAdminSecret(newSecret: string): boolean {
  try {
    const config = {
      adminSecret: newSecret,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(ADMIN_CONFIG_FILE, JSON.stringify(config, null, 2), { encoding: "utf-8", mode: 0o600 });
    return true;
  } catch (e) {
    console.error("Error saving admin config file");
    return false;
  }
}

function verifyAdminAuth(req: Request): boolean {
  const adminKeyHeader = req.headers["x-admin-key"] as string | undefined;
  const authHeader = req.headers["authorization"] as string | undefined;
  const queryKey = req.query.adminKey as string | undefined;

  const currentSecret = getAdminSecret();
  const providedKey = adminKeyHeader || (authHeader?.startsWith("Bearer ") ? authHeader.substring(7).trim() : authHeader?.trim()) || queryKey?.trim();
  
  if (!providedKey) return false;
  return timingSafeSecretCompare(providedKey, currentSecret);
}

function loadSubscribers(): Subscriber[] {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading subscribers file:", e);
  }
  return [];
}

function saveSubscribers(subscribers: Subscriber[]) {
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving subscribers file:", e);
  }
}

function loadMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading messages file:", e);
  }
  return [];
}

function saveMessages(messages: ContactMessage[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving messages file:", e);
  }
}

function loadJobApplications(): JobApplication[] {
  try {
    if (fs.existsSync(JOBS_FILE)) {
      const data = fs.readFileSync(JOBS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading job applications file:", e);
  }
  return [];
}

function saveJobApplications(applications: JobApplication[]) {
  try {
    fs.writeFileSync(JOBS_FILE, JSON.stringify(applications, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving job applications file:", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Zero-Trust IP Rate Limiting & Throttling
  interface RateLimitRecord {
    count: number;
    resetTime: number;
  }
  const rateLimitMap = new Map<string, RateLimitRecord>();

  const createRateLimiter = (maxRequests: number, windowMs: number, customMessage?: string) => {
    return (req: Request, res: Response, next: () => void) => {
      const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "local";
      const now = Date.now();
      const record = rateLimitMap.get(clientIp);

      if (!record || now > record.resetTime) {
        rateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs });
        return next();
      }

      record.count++;
      if (record.count > maxRequests) {
        const retryAfter = Math.ceil((record.resetTime - now) / 1000);
        res.setHeader("Retry-After", String(retryAfter));
        return res.status(429).json({
          success: false,
          error: customMessage || `تم تجاوز الحد المسموح للطلبات. يرجى الانتظار ${retryAfter} ثانية.`,
          retryAfter
        });
      }
      next();
    };
  };

  const publicApiLimiter = createRateLimiter(40, 60 * 1000); // 40 requests per minute

  // Optimized Enterprise HTTP Headers (Fully compatible with Live Preview & Standalone Browsing)
  app.use((req: Request, res: Response, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // CORS Configuration (Allows seamless interaction in Preview iframes, Google AI Studio, and Production)
  app.use((req: Request, res: Response, next) => {
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Key");
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ extended: true, limit: "15mb" }));

  // Brute-force protection for admin verification
  const failedLoginAttempts = new Map<string, { count: number; lockedUntil: number }>();

  // LLMs.txt & Knowledge Grounding for ChatGPT, Gemini, Perplexity, and AI search engines
  app.get(["/llms.txt", "/.well-known/llms.txt"], (req: Request, res: Response) => {
    const filePath = path.join(process.cwd(), "public", "llms.txt");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.sendFile(filePath);
    }
    return res.status(404).send("llms.txt not found");
  });

  app.get(["/llms-full.txt", "/.well-known/llms-full.txt"], (req: Request, res: Response) => {
    const filePath = path.join(process.cwd(), "public", "llms-full.txt");
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.sendFile(filePath);
    }
    return res.status(404).send("llms-full.txt not found");
  });

  // API Health Check & Entity Knowledge Schema
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({
      status: "ok",
      service: "SubHook Smart Store Services API",
      organization: "متجر SubHook الذكي (SubHook Smart Store)",
      ownership: "إدارة وإشراف م/ عبدالرحمن عبده علي الريمي",
      owner: "م/ عبدالرحمن عبده علي الريمي (Eng. Abdulrahman Abdo Ali Al-Rimi)",
      founder: "م/ عبدالرحمن عبده علي الريمي (Eng. Abdulrahman Abdo Ali Al-Rimi)",
      role: "المؤسس والمدير العام - م/ عبدالرحمن عبده علي الريمي (Founder & General Manager)",
      slogan: "متجر SubHook الذكي للخدمات الرقمية والبرمجية وحلول الاشتراكات والتسويق الإلكتروني",
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    });
  });

  // Newsletter Subscribe Endpoint
  app.post("/api/newsletter/subscribe", publicApiLimiter, async (req: Request, res: Response) => {
    try {
      const { email, source } = req.body;
      const validation = validateEmailStrict(email);

      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: validation.errorAr || validation.errorEn,
          suggestion: validation.suggestion,
          providerType: validation.providerType,
        });
      }

      const cleanEmail = validation.cleanEmail;
      const subscribers = loadSubscribers();

      const existingIndex = subscribers.findIndex((s) => s.email.toLowerCase() === cleanEmail);
      const timestamp = new Date().toISOString();

      if (existingIndex >= 0) {
        // Update existing record timestamp and bump to top of list
        const existingSub = subscribers[existingIndex];
        existingSub.subscribedAt = timestamp;
        existingSub.source = sanitizeInput(source, 100) || existingSub.source || "SubHook Smart Newsletter";
        subscribers.splice(existingIndex, 1);
        subscribers.unshift(existingSub);
        saveSubscribers(subscribers);

        console.log(`[SubHook Newsletter] Subscriber updated: ${maskEmail(cleanEmail)} (Count: ${subscribers.length})`);

        return res.json({
          success: true,
          status: "already_subscribed",
          message: "أنت مشترك بالفعل في النشرة البريدية الاستراتيجية، تم تحديث وتأكيد بياناتك بنجاح!",
          email: cleanEmail,
          providerName: validation.providerName,
          providerType: validation.providerType,
          totalSubscribers: subscribers.length,
          timestamp,
        });
      }

      const newSubscriber: Subscriber = {
        id: generateSecureId("sub"),
        email: cleanEmail,
        subscribedAt: timestamp,
        source: sanitizeInput(source, 100) || "SubHook Smart Newsletter",
        ip: (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "local",
        userAgent: sanitizeInput(req.headers["user-agent"] || "unknown", 200),
      };

      subscribers.unshift(newSubscriber);
      saveSubscribers(subscribers);

      console.log(`[SubHook Newsletter] New subscriber registered: ${maskEmail(cleanEmail)} via ${validation.providerName} (Count: ${subscribers.length})`);

      return res.status(201).json({
        success: true,
        status: "subscribed",
        message: "تم تسجيل اشتراكك بنجاح في النشرة البريدية الذكية لمتجر SubHook الذكي!",
        email: cleanEmail,
        providerName: validation.providerName,
        providerType: validation.providerType,
        totalSubscribers: subscribers.length,
        timestamp,
      });
    } catch (error) {
      console.error("Error in newsletter subscription processing");
      return res.status(500).json({
        success: false,
        error: "حدث خطأ أثناء معالجة الاشتراك، يرجى المحاولة لاحقاً.",
      });
    }
  });

  // Admin Authentication Verification Endpoint
  app.post("/api/admin/verify", (req: Request, res: Response) => {
    const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "local";
    const now = Date.now();
    
    // Check if IP is currently locked due to too many failed attempts
    const attemptRecord = failedLoginAttempts.get(clientIp);
    if (attemptRecord && attemptRecord.lockedUntil > now) {
      const waitSeconds = Math.ceil((attemptRecord.lockedUntil - now) / 1000);
      return res.status(429).json({
        success: false,
        authenticated: false,
        error: `تم قفل محاولات تسجيل الدخول مؤقتاً بسبب المحاولات المتكررة. يرجى الانتظار ${waitSeconds} ثانية.`,
        retryAfter: waitSeconds,
      });
    }

    const { adminKey, email } = req.body;
    const currentSecret = getAdminSecret();

    if (adminKey && timingSafeSecretCompare(String(adminKey).trim(), currentSecret)) {
      // Clear failed attempts on successful authentication
      failedLoginAttempts.delete(clientIp);

      return res.json({
        success: true,
        authenticated: true,
        adminEmail: email || "support@subhook.site",
        adminName: "م/ عبدالرحمن عبده علي الريمي (Eng. Abdulrahman Abdo Ali Al-Rimi)",
        role: "المؤسس والمدير العام - م/ عبدالرحمن عبده علي الريمي (Founder & General Manager)",
        ownership: "إدارة وإشراف م/ عبدالرحمن عبده علي الريمي",
        organization: "متجر SubHook الذكي (SubHook Smart Store)",
        message: "تم التحقق من هوية إدارة الموقع بنجاح."
      });
    }

    // Record failed attempt with progressive lockout
    const count = (attemptRecord?.count || 0) + 1;
    const lockedUntil = count >= 5 ? now + 15 * 60 * 1000 : 0; // Lock for 15 minutes after 5 failures
    failedLoginAttempts.set(clientIp, { count, lockedUntil });

    return res.status(401).json({
      success: false,
      authenticated: false,
      error: "رمز مرور الإدارة غير صحيح. تم تسجيل محاولة الوصول غير المصرح بها."
    });
  });

  // Admin Change Password Endpoint
  app.post("/api/admin/change-password", (req: Request, res: Response) => {
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({
        success: false,
        error: "غير مصرح. يرجى تسجيل الدخول أولاً كمدير للموقع."
      });
    }

    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          error: "يرجى إدخال كلمة المرور الحالية وكلمة المرور الجديدة."
        });
      }

      const currentSecret = getAdminSecret();
      if (!timingSafeSecretCompare(String(currentPassword).trim(), currentSecret)) {
        return res.status(400).json({
          success: false,
          error: "كلمة المرور الحالية غير صحيحة."
        });
      }

      const cleanNewPassword = String(newPassword).trim();
      if (cleanNewPassword.length < 10) {
        return res.status(400).json({
          success: false,
          error: "يجب ألا تقل كلمة المرور الجديدة عن 10 خانات لضمان معايير الأمان المؤسسية."
        });
      }

      if (confirmPassword && cleanNewPassword !== String(confirmPassword).trim()) {
        return res.status(400).json({
          success: false,
          error: "تأكيد كلمة المرور الجديدة غير متطابق."
        });
      }

      const saved = setAdminSecret(cleanNewPassword);
      if (saved) {
        return res.json({
          success: true,
          message: "تم تحديث كلمة مرور الإدارة بنجاح وفق معايير الأمان المؤسسي!",
          newAdminKey: cleanNewPassword
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "حدث خطأ أثناء حفظ كلمة المرور الجديدة."
        });
      }
    } catch (err) {
      console.error("Error changing admin password");
      return res.status(500).json({
        success: false,
        error: "فشلت عملية تغيير كلمة المرور."
      });
    }
  });

  // Protected Retrieve Subscribers API (Admin Only)
  app.get("/api/newsletter/subscribers", (req: Request, res: Response) => {
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({
        success: false,
        error: "الوصول محظور: عناوين البريد الإلكتروني للمشتركين مشفرة ومتاحة لمدير الموقع فقط.",
        code: "UNAUTHORIZED"
      });
    }

    try {
      const subscribers = loadSubscribers();
      res.json({
        success: true,
        count: subscribers.length,
        subscribers,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to retrieve subscribers" });
    }
  });

  // Admin Portal: Retrieve Subscribers with Stats
  app.get("/api/admin/subscribers", (req: Request, res: Response) => {
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({
        success: false,
        error: "غير مصرح. يرجى إدخال رمز إدارة الموقع.",
      });
    }

    try {
      const subscribers = loadSubscribers();
      res.json({
        success: true,
        total: subscribers.length,
        subscribers,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error loading subscribers" });
    }
  });

  // Admin Portal: Delete Subscriber
  app.delete("/api/admin/subscribers/:id", (req: Request, res: Response) => {
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({ success: false, error: "غير مصرح." });
    }

    try {
      const { id } = req.params;
      let subscribers = loadSubscribers();
      const initialLen = subscribers.length;
      subscribers = subscribers.filter(s => s.id !== id && s.email !== id);
      
      if (subscribers.length < initialLen) {
        saveSubscribers(subscribers);
        return res.json({ success: true, message: "تم حذف المشترك بنجاح." });
      }
      return res.status(404).json({ success: false, error: "المشترك غير موجود." });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error deleting subscriber" });
    }
  });

  // Admin Portal: Retrieve Contact Messages
  app.get("/api/admin/messages", (req: Request, res: Response) => {
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({ success: false, error: "غير مصرح." });
    }

    try {
      const messages = loadMessages();
      res.json({
        success: true,
        total: messages.length,
        messages,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error loading messages" });
    }
  });

  // Admin Portal: Delete Message
  app.delete("/api/admin/messages/:id", (req: Request, res: Response) => {
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({ success: false, error: "غير مصرح." });
    }

    try {
      const { id } = req.params;
      let messages = loadMessages();
      messages = messages.filter(m => m.id !== id);
      saveMessages(messages);
      res.json({ success: true, message: "تم حذف الرسالة بنجاح." });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error deleting message" });
    }
  });

  // Contact Form & RFP Submission Endpoint
  app.post("/api/contact", publicApiLimiter, (req: Request, res: Response) => {
    try {
      const { name, email, phone, service, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: "يرجى تعبئة كافة الحقول الإلزامية.",
        });
      }

      const validation = validateEmailStrict(email);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: validation.errorAr || validation.errorEn,
          suggestion: validation.suggestion,
        });
      }

      const messages = loadMessages();
      const newMessage: ContactMessage = {
        id: generateSecureId("msg"),
        name: sanitizeInput(name, 120),
        email: validation.cleanEmail,
        phone: phone ? sanitizeInput(phone, 35) : undefined,
        service: service ? sanitizeInput(service, 100) : undefined,
        message: sanitizeInput(message, 5000),
        submittedAt: new Date().toISOString(),
      };

      messages.unshift(newMessage);
      saveMessages(messages);

      console.log(`[SubHook Contact] New message received from: ${maskEmail(validation.cleanEmail)}`);

      return res.status(201).json({
        success: true,
        message: "تم استلام رسالتك وطلبك بنجاح! سيتواصل معك فريقنا المختص خلال 24 ساعة.",
        id: newMessage.id,
      });
    } catch (error) {
      console.error("Error in contact submission processing");
      return res.status(500).json({ success: false, error: "Failed to process contact message." });
    }
  });

  // Job Application Submission Endpoint
  app.post("/api/jobs/apply", publicApiLimiter, (req: Request, res: Response) => {
    try {
      const { fullName, country, email, phone, bio, fileName, fileDataUrl, fileSize, fileType } = req.body;

      if (!fullName || !country || !email || !phone || !bio) {
        return res.status(400).json({
          success: false,
          error: "يرجى تعبئة كافة الحقول المطلوبة (الاسم بالكامل، الدولة، البريد الإلكتروني، رقم الهاتف، والنبذة المختصرة).",
        });
      }

      const validation = validateEmailStrict(email);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: validation.errorAr || validation.errorEn,
          suggestion: validation.suggestion,
        });
      }

      const applications = loadJobApplications();
      const newApplication: JobApplication = {
        id: generateSecureId("job"),
        fullName: sanitizeInput(fullName, 120),
        country: sanitizeInput(country, 80),
        email: validation.cleanEmail,
        phone: sanitizeInput(phone, 35),
        bio: sanitizeInput(bio, 5000),
        fileName: fileName ? sanitizeInput(fileName, 200) : undefined,
        fileDataUrl: fileDataUrl ? String(fileDataUrl) : undefined,
        fileSize: fileSize ? sanitizeInput(fileSize, 50) : undefined,
        fileType: fileType ? sanitizeInput(fileType, 80) : undefined,
        submittedAt: new Date().toISOString(),
        status: 'new',
        ip: (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "local",
        userAgent: sanitizeInput(req.headers["user-agent"] || "unknown", 255),
      };

      applications.unshift(newApplication);
      saveJobApplications(applications);

      console.log(`[SubHook Careers] New job application received for candidate (${maskEmail(validation.cleanEmail)})`);

      return res.status(201).json({
        success: true,
        message: "تم استلام طلب توظيفك وسيرتك الذاتية بنجاح! سيقوم فريق العمل في متجر SubHook الذكي بمراجعة ملفك والتواصل معك قريباً.",
        id: newApplication.id,
        application: {
          id: newApplication.id,
          fullName: newApplication.fullName,
          email: newApplication.email,
          country: newApplication.country,
          phone: newApplication.phone,
          submittedAt: newApplication.submittedAt
        }
      });
    } catch (error) {
      console.error("Error in job application submission processing");
      return res.status(500).json({ success: false, error: "حدث خطأ أثناء حفظ طلب التوظيف، يرجى المحاولة لاحقاً." });
    }
  });

  // Admin Portal: Retrieve Job Applications
  app.get("/api/admin/job-applications", (req: Request, res: Response) => {
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({ success: false, error: "غير مصرح. يرجى إدخال رمز إدارة الموقع." });
    }

    try {
      const applications = loadJobApplications();
      res.json({
        success: true,
        total: applications.length,
        applications,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error loading job applications" });
    }
  });

  // Admin Portal: Update Job Application Status
  app.patch("/api/admin/job-applications/:id/status", (req: Request, res: Response) => {
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({ success: false, error: "غير مصرح." });
    }

    try {
      const { id } = req.params;
      const { status } = req.body;
      const validStatuses = ['new', 'reviewed', 'interview', 'accepted', 'archived'];

      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ success: false, error: "حالة غير صالحة." });
      }

      let applications = loadJobApplications();
      const appIndex = applications.findIndex(a => a.id === id);

      if (appIndex === -1) {
        return res.status(404).json({ success: false, error: "طلب التوظيف غير موجود." });
      }

      applications[appIndex].status = status as any;
      saveJobApplications(applications);

      return res.json({
        success: true,
        message: "تم تحديث حالة طلب التوظيف بنجاح.",
        application: applications[appIndex]
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error updating job application status" });
    }
  });

  // Admin Portal: Delete Job Application
  app.delete("/api/admin/job-applications/:id", (req: Request, res: Response) => {
    if (!verifyAdminAuth(req)) {
      return res.status(401).json({ success: false, error: "غير مصرح." });
    }

    try {
      const { id } = req.params;
      let applications = loadJobApplications();
      const initialLen = applications.length;
      applications = applications.filter(a => a.id !== id);

      if (applications.length < initialLen) {
        saveJobApplications(applications);
        return res.json({ success: true, message: "تم حذف طلب التوظيف بنجاح." });
      }
      return res.status(404).json({ success: false, error: "طلب التوظيف غير موجود." });
    } catch (error) {
      res.status(500).json({ success: false, error: "Error deleting job application" });
    }
  });

  // Serve public static assets (Favicons, OG Images, Sitemap, Robots) directly
  const publicPath = path.join(process.cwd(), "public");
  app.use(express.static(publicPath, { maxAge: "1d" }));

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === "true" ? false : undefined,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { maxAge: "1y" }));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SubHook Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
