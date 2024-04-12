import React from "react";
import DaftarRequestBarang from "./DaftarRequestBarang";
import { Route, Routes } from "react-router-dom";
import DashboardMain from "../../dashboard/DashboardMain";

const DaftarRequestBarangMain = () => {
    return (
        <>
            <DashboardMain>
                <Routes>
                    <Route path="/" element={<DaftarRequestBarang />} />
                </Routes>
            </DashboardMain>
        </>
    );
}

export default DaftarRequestBarangMain;