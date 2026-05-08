import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Load balancer server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});