import React from "react";
import DashboardMain from "../../dashboard/DashboardMain";
import { Route, Routes } from "react-router-dom";
import DashboardMasterBankAcc from "./DashboardMasterBankAcc";

const DashboardMasterBankAccMain = () => {
    return (
        <>
            <DashboardMain>
                <Routes>
                    <Route path="/" element={<DashboardMasterBankAcc />} /> 
                </Routes>
            </DashboardMain>
        </>
    );

}

export default DashboardMasterBankAccMain;