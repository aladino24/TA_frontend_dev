import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardMain from "../dashboard/DashboardMain";
import PersediaanBarang from "./PersediaanBarang";

const PersediaanBarangMain = () => {
    return (
        <>
            <DashboardMain>
                <Routes>
                    <Route path="/" element={<PersediaanBarang />}/>
                </Routes>
             </DashboardMain>
        </>
    );
}

export default PersediaanBarangMain;