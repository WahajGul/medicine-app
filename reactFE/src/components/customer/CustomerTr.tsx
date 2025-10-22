import { type customerRow } from "./CustomerPage";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TrProps = {
	data: customerRow;
	refresh: () => void;
};

const MedicineTr: React.FC<TrProps> = ({ data, refresh }) => {
	const [editMode, setEditMode] = useState(false);
	const [rowData, setRowData] = useState<customerRow>(data);

	function onEdit() {
		if (editMode) {
			if (
				data.first_name !== rowData.first_name ||
				data.last_name !== rowData.last_name ||
				data.phone !== rowData.phone ||
				data.email !== rowData.email ||
				data.address !== rowData.address
			) {
				fetch(`http://localhost:3000/customers/${data.customer_id}`, {
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
		fetch(`http://localhost:3000/customers/${id}`, { method: "DELETE" }).then(
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
			<TableCell>{data.customer_id}</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						name="first_name"
						defaultValue={rowData.first_name}
					/>
				) : (
					data.first_name
				)}
			</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						defaultValue={rowData.last_name}
						name="last_name"
					/>
				) : (
					data.last_name
				)}
			</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						defaultValue={rowData.phone}
						name="phone"
					/>
				) : (
					data.phone
				)}
			</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						defaultValue={rowData.email}
						name="email"
					/>
				) : (
					data.email
				)}
			</TableCell>
			<TableCell>
				{editMode ? (
					<Input
						onChange={(e) => onChange(e.target.name, e.target.value)}
						defaultValue={rowData.address}
						name="address"
					/>
				) : (
					data.address
				)}
			</TableCell>
			<TableCell>
				<Button className="m-2" onClick={onEdit}>
					{editMode ? "Save" : "Edit"}
				</Button>
				<Button className="m-2" onClick={() => onDelete(data.customer_id)}>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default MedicineTr;
