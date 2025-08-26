import express from "express";
import cors from "cors";
import { showAllMeds, searchMeds, deleteCustomer } from "./db.js";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// ============= Medicines ==================

app.get("/medicines", async (req, res) => {
	const { value } = req.query;
	const data = await searchMeds(value);
	res.status(200).json(data);
});

app.post("/medicines", async (req, res) => {
	const user = req.body;
	const data = await insertRow(user);
	res.status(201).json(data);
});

app.delete("/medicines/:id", async (req, res) => {
	const { id } = req.params;
	const data = deleteCustomer(id);
	res.status(200).json(data);
});

app.listen(port, () => {
	console.log("server running on ", port);
});
