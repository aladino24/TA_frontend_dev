import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Config from "../../../../config";
import DashboardMain from "../../dashboard/DashboardMain";
import StockOpnameDetail from "./StockOpnameDetail";
import StockOpnameMaster from "./StockOpnameMaster";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";

const StockOpnameMain = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            const token = localStorage.getItem('token');
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`,
                },
            }

            try {
                const response = await axios.get(
                    Config.api.server2 + 'stock-opname/exist-stockopname-master',
                    axiosConfig
                )

                const data = response.data;
                setIsSuccess(data.success);
                setResponseData(data);

                if(data.success){
                    navigate('/stock-opname/detail', { state: { responseData: data } });
                }else{
                    navigate('/stock-opname/master')
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [navigate]);
    return (
        <DashboardMain>
            <SweetAlertLoading show={loading} />
            {!loading &&( 
            <Routes>
                <Route path="/detail" element={isSuccess ? <StockOpnameDetail /> : <Navigate to="/stock-opname/master" />}/>
                <Route path="/master" element={isSuccess ? <StockOpnameMaster /> : <Navigate to="/stock-opname/detail" />} />
            </Routes>
            )}
        </DashboardMain>
    );
}

export default StockOpnameMain;