import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import type { medicineRow } from "./MedicinePage";

type AddMedicineProps = {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	refresh: () => void;
};

const AddMedicine: React.FC<AddMedicineProps> = ({
	query,
	refresh,
	setQuery,
}) => {
	const [localQuery, setLocalQuery] = useState("");
	useEffect(() => {
		const timeout = setTimeout(() => {
			setQuery(localQuery);
		}, 500);

		return () => clearTimeout(timeout);
	}, [localQuery, setQuery]);

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setLocalQuery(e.target.value);
	}

	return (
		<div className="flex m-4 w-full items-center justify-center gap-2">
			<Input
				placeholder="Search ... [Company or Name]"
				className="w-2xl"
				onChange={onChange}
				value={localQuery}
			/>
			<DialogDemo refresh={refresh} />
		</div>
	);
};

export function DialogDemo({ refresh }: { refresh: () => void }) {
	const [addMedicineData, setAddMedicineData] = useState({
		m_name: "",
		m_rate: 0,
		m_comp_name: "Mix Items",
		m_discount: 0,
		m_qty: 0,
	});

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAddMedicineData((u) => {
			return { ...u, [e.target.name]: e.target.value };
		});
	}
	function onSubmitT(e: React.FormEvent) {
		e.preventDefault();
		fetch("http://localhost:3000/medicines", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(addMedicineData),
		}).then(() => refresh());
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type="button">Add Medicine</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={onSubmitT}>
					<DialogHeader>
						<DialogTitle>Add Medicine</DialogTitle>
						<DialogDescription>
							Add a new Medicine here. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="m_name">Name</Label>
							<Input id="m_name" name="m_name" onChange={onChange} />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="m_rate">Rate</Label>
							<Input
								type="number"
								id="m_rate"
								name="m_rate"
								onChange={onChange}
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="m_comp_name">Company Name</Label>
							<Input
								id="m_comp_name"
								name="m_comp_name"
								defaultValue="Mix Items"
								onChange={onChange}
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="m_discount">Discount</Label>
							<Input
								type="number"
								id="m_discount"
								name="m_discount"
								onChange={onChange}
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="m_qty">Quantity</Label>
							<Input
								type="number"
								id="m_qty"
								name="m_qty"
								onChange={onChange}
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>

						<DialogClose asChild>
							<Button type="submit">Save changes</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
export default AddMedicine;
