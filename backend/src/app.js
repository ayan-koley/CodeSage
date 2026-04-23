import exprss from 'express';
import cors from 'cors';

const app = exprss();
app.use(exprss.json());
app.use(exprss.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

import analysisRoute from "./routes/analysis.routes.js";
app.use("/api/v1/analysis", analysisRoute);
app.use("/api/v1/healthcheck", (req, res) => {
    return res.status(200).json({message: "Server is healthy"});
})

export default app;