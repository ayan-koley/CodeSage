import exprss from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'

const app = exprss();
app.use(exprss.json());
app.use(exprss.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY, 
    secretKey: process.env.CLERK_SECRET_KEY
}));

import analysisRoute from "./routes/analysis.routes.js";
app.use("/api/v1/analysis", analysisRoute);
app.use("/api/v1/healthcheck", (req, res) => {
    return res.status(200).json({message: "Server is healthy"});
})

export default app;