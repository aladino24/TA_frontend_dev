import React from "react";
import DashboardMain from "../../dashboard/DashboardMain";
import { Route, Routes } from "react-router-dom";
import CreateRequestBarangMaster from "./CreateRequestBarangMaster";
import CreateRequestBarangDetail from "./CreateRequestBarangDetail";

const CreateRequestBarangMain = () => {
    return (
        <>
          <DashboardMain>
              <Routes>
                    <Route path="/master" element={<CreateRequestBarangMaster />} />
                    <Route path="/detail" element={<CreateRequestBarangDetail />} />
              </Routes>
          </DashboardMain>
        </>
    );
}

export default CreateRequestBarangMain;