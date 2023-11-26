import React, { useState } from 'react';
import './Dashboard.css';
import DashboardMain from './pages/contents/dashboard/DashboardMain';
import DashboardContent from './pages/contents/dashboard/DashboardContent';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import DashboardDataMasterMain from './pages/contents/datamaster/master-user/DashboardMasterUserMain';

function Dashboard() {
    return (
        
            <DashboardMain>
                 {/* Halaman dinamis berdasarkan route */}
                <Routes>
                    <Route path="/" element={<DashboardContent />} />
                    <Route path="/master-user" element={<DashboardDataMasterMain />} />
                </Routes>
            </DashboardMain>
    );
}

export default Dashboard;
