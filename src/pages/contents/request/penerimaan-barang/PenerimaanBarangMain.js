import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardMain from "../../dashboard/DashboardMain";
import PenerimaanBarang from "./PenerimaanBarang";

const PenerimaanBarangMain = () => {
    return <>
       <DashboardMain>
            <Routes>
                <Route path="/" element={<PenerimaanBarang />}/>
            </Routes>
       </DashboardMain>
    </>;
}

export default PenerimaanBarangMain;