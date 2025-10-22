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
import { type customerRow } from "./CustomerPage";

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
				placeholder="Search ... [Id or Name]"
				className="w-2xl"
				onChange={onChange}
				value={localQuery}
			/>
			<DialogDemo refresh={refresh} />
		</div>
	);
};

export function DialogDemo({ refresh }: { refresh: () => void }) {
	const [addCustomerData, setAddCustomerData] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: "not Available",
		address: "not Available",
	});

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAddCustomerData((u) => {
			return { ...u, [e.target.name]: e.target.value };
		});
	}
	function onSubmitT(e: React.FormEvent) {
		e.preventDefault();
		fetch("http://localhost:3000/customers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(addCustomerData),
		}).then(() => refresh());
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type="button">Add Customer</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={onSubmitT}>
					<DialogHeader>
						<DialogTitle>Add a new Customer</DialogTitle>
						<DialogDescription>
							Add a new Customer here. Click save when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="first_name">First Name</Label>
							<Input id="first_name" name="first_name" onChange={onChange} />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="last_name">Last Name</Label>
							<Input
								type="text"
								id="last_name"
								name="last_name"
								onChange={onChange}
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="phone">Phone</Label>
							<Input
								id="phone"
								name="phone"
								type="number"
								onChange={onChange}
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="email">Email</Label>
							<Input type="email" id="email" name="email" onChange={onChange} />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="address">Address</Label>
							<Input
								type="text"
								id="address"
								name="address"
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
