import React, { useState } from 'react';
import DashboardMain from '../../dashboard/DashboardMain';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import DashboardDataMaster from './DashboardMasterUser';

function DashboardMasterUserMain() {
    return (
        <>
            <DashboardMain>
                 {/* Halaman dinamis berdasarkan route */}
                <Routes>
                    <Route path="/" element={<DashboardDataMaster />} />
                </Routes>
            </DashboardMain>
        </>
    );
}

export default DashboardMasterUserMain;
