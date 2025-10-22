import { type medicineRow } from "./MedicinePage";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TrProps = {
	data: medicineRow;
	refresh: () => void;
};

const MedicineTr: React.FC<TrProps> = ({ data, refresh }) => {
	const [editMode, setEditMode] = useState(false);
	const [rowData, setRowData] = useState<medicineRow>(data);

	function onEdit() {
		if (editMode) {
			if (
				data.m_name !== rowData.m_name ||
				data.m_rate !== rowData.m_rate ||
				data.m_comp_name !== rowData.m_comp_name ||
				data.m_discount !== rowData.m_discount ||
				data.m_qty !== rowData.m_qty
			) {
				fetch(`http://localhost:3000/medicines/${data.m_id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(rowData),
				}).then(() => {
					refresh();
				});
			}
		}
		setEditMode((e) => !e);
	}

	function onDelete(id: number | string): void {
		fetch(`http://localhost:3000/medicines/${id}`, { method: "DELETE" }).then(
			() => refresh(),
		);
	}

	function onChange(name: string, value: string) {
		setRowData((pre) => {
			return { ...pre, [name]: value };
		});
	}

	return (
		<TableRow>
			<TableCell>{data.m_id}</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						name="m_name"
						defaultValue={rowData.m_name}
					/>
				) : (
					data.m_name
				)}
			</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						defaultValue={rowData.m_rate}
						name="m_rate"
					/>
				) : (
					data.m_rate + "PKR"
				)}
			</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						defaultValue={rowData.m_comp_name}
						name="m_comp_name"
					/>
				) : (
					data.m_comp_name
				)}
			</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						defaultValue={rowData.m_discount}
						name="m_discount"
					/>
				) : (
					data.m_discount + "%"
				)}
			</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						defaultValue={rowData.m_qty}
						name="m_qty"
					/>
				) : (
					data.m_qty + " PCS"
				)}
			</TableCell>
			<TableCell>
				<Button className="m-2" onClick={onEdit}>
					{editMode ? "Save" : "Edit"}
				</Button>
				<Button className="m-2" onClick={() => onDelete(data.m_id)}>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default MedicineTr;
