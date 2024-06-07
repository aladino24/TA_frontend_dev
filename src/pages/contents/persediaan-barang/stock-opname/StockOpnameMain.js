import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardMain from "../../dashboard/DashboardMain";
import StockOpnameDetail from "./StockOpnameDetail";
import StockOpnameMaster from "./StockOpnameMaster";

const StockOpnameMain = () => {
    return (
        <DashboardMain>
            <Routes>
                <Route path="/master" element={<StockOpnameMaster />} />
                <Route path="/detail" element={<StockOpnameDetail />}/>
            </Routes>
        </DashboardMain>
    );
}

export default StockOpnameMain;