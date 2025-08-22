import express from "express";
import cors from "cors";
import { showAll, insertRow } from "./db.js";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.get("/test", async (req, res) => {
	const data = await showAll();
	res.status(201).json(data);
});

app.post("/test", async (req, res) => {
	const user = req.body;
	const data = await insertRow(user);
	res.status(201).json(data);
});
app.listen(port, () => {
	console.log("server running on ", port);
});
