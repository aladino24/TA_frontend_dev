import React from "react";
import DaftarRequestBarang from "./DaftarRequestBarang";
import { Route, Routes } from "react-router-dom";
import DashboardMain from "../../dashboard/DashboardMain";
import DaftarRequestBarangDetail from "./DaftarRequestBarangDetail";

const DaftarRequestBarangDetailMain = () => {
    return (
        <>
            <DashboardMain>
                <Routes>
                    <Route path="/" element={<DaftarRequestBarangDetail />} />
                </Routes>
            </DashboardMain>
        </>
    );
}

export default DaftarRequestBarangDetailMain;