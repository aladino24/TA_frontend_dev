import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardMain from "../../dashboard/DashboardMain";
import DashboardMasterBrand from "./DashboardMasterBrand";


const DashboardMasterBrandMain = () => {
    return (
        <>
            <DashboardMain>
               <Routes>
                    <Route path="/" element={<DashboardMasterBrand />} /> 
               </Routes>
            </DashboardMain>
        </>
    );
}

export default DashboardMasterBrandMain;