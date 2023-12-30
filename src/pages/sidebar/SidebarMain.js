import React, { useState } from "react";
import DataMaster from './datamaster/DataMaster';
import Pemesanan from './pemesanan/Pemesanan';
import Inventory from './inventory/Inventory';

const SidebarMain = () => {
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else{
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    return (
        <>
            <ul className={style} id="accordionSidebar">
                {/*  <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                    <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fa fa-medkit" aria-hidden="true"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">MedLink</div>
                    <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                </div>
                </a>

                {/*   <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/*  <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>


                {/*  <!-- Divider --> */}
                <hr className="sidebar-divider" />

                <DataMaster />

                {/*  <!-- Divider --> */}
                <hr className="sidebar-divider" />

                <Pemesanan />

                {/*  <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* <!-- Heading --> */}
                <Inventory />

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />

                {/*   <!-- Sidebar Toggler (Sidebar) --> */}
                {/*   <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                </div> */}

                {/*  <!-- Sidebar Message --> */}
            </ul>
        </>
    );
}


export default SidebarMain;