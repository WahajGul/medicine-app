import express from "express";
import cors from "cors";
import {
	showAllMeds,
	searchMeds,
	deleteMedicine,
	insertMedicine,
	updateMedicine,
} from "./db.js";
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
	const { m_name, m_rate, m_comp_name, m_discount, m_qty } = req.body;
	const data = await insertMedicine(
		m_name,
		m_rate,
		m_comp_name,
		m_discount,
		m_qty,
	);
	res.status(201).json(data);
});

app.delete("/medicines/:id", async (req, res) => {
	const { id } = req.params;
	const data = deleteMedicine(id);
	res.status(200).json(data);
});

app.put("/medicines/:id", async (req, res) => {
	const { id } = req.params;
	const { m_name, m_rate, m_comp_name, m_discount, m_qty } = req.body;
	const data = await updateMedicine(
		id,
		m_name,
		m_rate,
		m_comp_name,
		m_discount,
		m_qty,
	);
	res.status(200).json(data);
});

app.listen(port, () => {
	console.log("server running on ", port);
});
