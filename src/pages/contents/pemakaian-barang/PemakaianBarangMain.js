import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardMain from "../dashboard/DashboardMain";
import PemakaianBarangDetail from "./PemakaianBarangDetail";
import PemakaianBarangMaster from "./PemakaianBarangMaster";

const PemakaianBarangMain = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8001/api/pemakaian-barang/status-usage-master");
                const data = await response.json();

                if (data.success) {
                    navigate("/pemakaian-barang/detail");
                } else {
                    navigate("/pemakaian-barang/master");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle the error as needed, e.g., navigate to an error page or show an error message
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <DashboardMain>
            <Routes>
                <Route path="/detail" element={<PemakaianBarangDetail />} />
                <Route path="/master" element={<PemakaianBarangMaster />} />
            </Routes>
        </DashboardMain>
    );
}

export default PemakaianBarangMain;
