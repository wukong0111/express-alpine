import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Request, type Response } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
if (isDev) {
    app.use(express.static(path.join(__dirname, "../public")));
} else {
    app.use(express.static(path.join(__dirname, "public")));
}

// API Routes
app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
        status: "ok",
        environment: process.env.NODE_ENV,
        express: "5.1.0",
    });
});

app.get("/api/users", async (_req: Request, res: Response) => {
    const users = await Promise.resolve([{ id: 1, name: "Usuario Ejemplo" }]);
    res.json({ users });
});

// Frontend Routes
app.get("/", (_req: Request, res: Response) => {
    const indexPath = isDev
        ? path.join(__dirname, "../public/index.html")
        : path.join(__dirname, "public/index.html");
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`🚀 Express 5.1.0 server running at http://localhost:${port}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
});
