import React from "react";
import DashboardMain from "../../dashboard/DashboardMain";
import { Route, Routes } from "react-router-dom";
import DashboardMasterStock from "./DashboardMasterStock";

const DashboardMasterStockMain = () => {
    return (
        <>
            <DashboardMain>
                <Routes>
                    <Route path="/" element={<DashboardMasterStock />} />
                </Routes>
            </DashboardMain>
        </>
    );
};

export default DashboardMasterStockMain;
