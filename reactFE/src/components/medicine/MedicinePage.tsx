import { useState, useEffect } from "react";
import AddMedicine from "./AddMedicine";
import {
	Table,
	TableHead,
	TableHeader,
	TableBody,
	TableRow,
} from "@/components/ui/table";
import MedicineTr from "./MedicineTr";
export type medicineRow = {
	m_id: number;
	m_name: string;
	m_rate: number;
	m_comp_name: string;
	m_discount: number;
	m_qty: number;
};
const MedicinePage = () => {
	const [query, setQuery] = useState("");
	const [rows, setRows] = useState<medicineRow[]>([]);

	async function getRows() {
		const res = await fetch(`http://localhost:3000/medicines?value=${query}`);
		const data = await res.json();
		setRows(data);
	}
	useEffect(() => {
		getRows();
		console.log(query);
	}, [query]);

	return (
		<div className="flex flex-col w-full bg-neutral-50 content-center p-2">
			<h1 className="p-4 text-3xl text-center text-neutral-50 bg-neutral-900 m-4 rounded-lg">
				MedicinePage
			</h1>
			<AddMedicine setQuery={setQuery} refresh={getRows} query={query} />
			<Table>
				<TableHeader className="bg-black">
					<TableRow>
						<TableHead className="text-neutral-50 w-1/7">ID</TableHead>
						<TableHead className="text-neutral-50 w-1/7">Name</TableHead>
						<TableHead className="text-neutral-50 w-1/7">Rate</TableHead>
						<TableHead className="text-neutral-50 w-1/7">Company</TableHead>
						<TableHead className="text-neutral-50 w-1/7">Discount</TableHead>
						<TableHead className="text-neutral-50 w-1/7">Qty</TableHead>
						<TableHead className="text-neutral-50 w-1/7">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((tr) => (
						<MedicineTr key={tr.m_id} data={tr} refresh={getRows} />
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default MedicinePage;
