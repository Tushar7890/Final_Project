import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
dotenv.config();
const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

//static files
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(express.static(path.join(__dirname,"./client/build")));

// app.get("/api", (req, res) => {
//   res.send("Hello World!");
// });

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build", "index.html"));
// });

// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(bodyParser.urlencoded({ extended: false }));


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server is listening on port 5000');
    });
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });


// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is listening on {port}`);
// });
