import React from "react";
import DashboardMain from "../../dashboard/DashboardMain";
import { Route, Routes } from "react-router-dom";
import CreateRequestBarang from "./CreateRequestBarang";

const CreateRequestBarangMain = () => {
    return (
        <>
          <DashboardMain>
              <Routes>
                    <Route path="/" element={<CreateRequestBarang />} />
              </Routes>
          </DashboardMain>
        </>
    );
}

export default CreateRequestBarangMain;