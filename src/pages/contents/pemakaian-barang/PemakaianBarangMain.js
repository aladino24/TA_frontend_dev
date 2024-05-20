import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Config from "../../../config";
import DashboardMain from "../dashboard/DashboardMain";
import PemakaianBarangDetail from "./PemakaianBarangDetail";
import PemakaianBarangMaster from "./PemakaianBarangMaster";
import SweetAlertLoading from "../../../components/SweetAlertLoading";

const PemakaianBarangMain = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(null);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const response = await axios.get(
                    Config.api.server2 + "pemakaian-barang/status-usage-master",
                    axiosConfig
                );
                const data = response.data;

                setIsSuccess(data.success);
                setResponseData(data);

                if (data.success) {
                    navigate("/pemakaian-barang/detail", { state: { responseData: data } });
                } else {
                    navigate("/pemakaian-barang/master");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <DashboardMain>
            <SweetAlertLoading show={loading} />
            {!loading && (
                <Routes>
                    <Route path="/detail" element={isSuccess ? <PemakaianBarangDetail /> : <Navigate to="/pemakaian-barang/master" />} />
                    <Route path="/master" element={!isSuccess ? <PemakaianBarangMaster /> : <Navigate to="/pemakaian-barang/detail" />} />
                </Routes>
            )}
        </DashboardMain>
    );
}

export default PemakaianBarangMain;
