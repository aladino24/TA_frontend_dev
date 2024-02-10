import React from "react";
import DashboardMain from "../../dashboard/DashboardMain";
import { Route, Routes } from "react-router-dom";
import DashboardMasterDistributor from "./DashboardMasterDistributor";

const DashboardMasterDistributorMain = () => {
    return (
        <>
            <DashboardMain>
                <Routes >
                  <Route path="/" element={<DashboardMasterDistributor />} />
                </Routes>
            </DashboardMain>
        </>
    );
}

export default DashboardMasterDistributorMain;