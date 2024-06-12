import React, { useEffect, useState } from "react";
import DashboardMain from "../../dashboard/DashboardMain";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CreateRequestBarangMaster from "./CreateRequestBarangMaster";
import CreateRequestBarangDetail from "./CreateRequestBarangDetail";
import Config from "../../../../config";
import axios from "axios";
import SweetAlertLoading from "../../../../components/SweetAlertLoading";

const CreateRequestBarangMain = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }

            try {
                const response = await axios.get(
                    `${Config.api.server3}exist-request-so-master`,
                    axiosConfig
                );

                const data = response.data;
                setIsSuccess(data.success);
                setResponseData(data);
                if (data.success) {
                    
                    navigate('/request-barang/create/detail', { state: { responseData: data } });
                } else {
                    navigate('/request-barang/create/master')
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    },[navigate])

    return (
        <>
          <DashboardMain>
            <SweetAlertLoading show={loading} />
            {!loading && (
              <Routes>
                    <Route path="/master" element={!isSuccess ? <CreateRequestBarangMaster /> : <Navigate to="/request-barang/create/detail" />} />
                 <Route path="/detail" element={isSuccess ? <CreateRequestBarangDetail /> : <Navigate to="/request-barang/create/master" />} />
              </Routes>
              )}
          </DashboardMain>
        </>
    );
}

export default CreateRequestBarangMain;