import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardMain from "../../dashboard/DashboardMain";
import CreateRequestBarangDetail from "./CreateRequestBarangDetail";

const CreateRequestBarangDetailMain = () => {
    return (
        <>
            <DashboardMain>
                <Routes>
                        <Route path="/" element={<CreateRequestBarangDetail />} />
                </Routes>
            </DashboardMain>
        </>
    );
}

export default CreateRequestBarangDetailMain;