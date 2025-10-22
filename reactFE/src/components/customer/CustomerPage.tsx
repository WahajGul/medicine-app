import { useState, useEffect } from "react";
import AddCustomer from "./AddCustomer";
import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import CustomerTr from "./CustomerTr";
export type customerRow = {
    customer_id: number;
    first_name: string;
    last_name: number;
    phone: string;
    email: string;
    address: string;
};
const CustomerPage = () => {
    const [query, setQuery] = useState("");
    const [rows, setRows] = useState<customerRow[]>([]);

    async function getRows() {
        const res = await fetch(
            `http://localhost:3000/customers?value=${query}`,
        );
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
                Customers Info
            </h1>
            <AddCustomer setQuery={setQuery} refresh={getRows} query={query} />
            <Table>
                <TableHeader className="bg-black">
                    <TableRow>
                        <TableHead className="text-neutral-50 w-1/7">
                            ID
                        </TableHead>
                        <TableHead className="text-neutral-50 w-1/7">
                            First
                        </TableHead>
                        <TableHead className="text-neutral-50 w-1/7">
                            Last
                        </TableHead>
                        <TableHead className="text-neutral-50 w-1/7">
                            Phone
                        </TableHead>
                        <TableHead className="text-neutral-50 w-1/7">
                            Email
                        </TableHead>
                        <TableHead className="text-neutral-50 w-1/7">
                            Address
                        </TableHead>
                        <TableHead className="text-neutral-50 w-1/7">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((tr) => (
                        <CustomerTr
                            key={tr.customer_id}
                            data={tr}
                            refresh={getRows}
                        />
                    )) || (
                        <TableRow className="text-center text-lg ">
                            <TableCell colSpan={7}>
                                Not Data Available Error encountered
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomerPage;
