import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import MedicinePage from "./components/medicine/MedicinePage";
import CustomerPage from "./components/customer/CustomerPage";
import OrderPage from "./components/order/OrderPage";

function App() {
    const [open, setOpen] = useState(false);
    return (
        <BrowserRouter>
            <div className="w-screen grid grid-cols-1 h-screen">
                <SidebarProvider open={open} onOpenChange={setOpen}>
                    <AppSidebar />
                    <main>
                        <SidebarTrigger />
                    </main>
                    {/* <MedicinePage /> */}
                    <Routes>
                        <Route path="/" element={<div>Dashboard</div>} />
                        <Route path="/medicines" element={<MedicinePage />} />
                        <Route path="/customers" element={<CustomerPage />} />
                        <Route path="/orders" element={<OrderPage />} />
                    </Routes>
                </SidebarProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;
