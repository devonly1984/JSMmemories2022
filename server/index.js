import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose"
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
app.use("/posts", postRoutes);
app.use("/users", authRoutes);
mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>
		app.listen(PORT, () => {
			console.log(`server connected to ${PORT}`);
		})
	)
	.catch((error) => console.log(`${error.message} has occured on the server`));
