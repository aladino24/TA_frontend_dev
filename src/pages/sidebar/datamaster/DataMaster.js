import React from "react";
import { Link } from "react-router-dom";


const DataMaster = () => {

    return (
        <div>
          {/*  <!-- Data Master --> */}
          <div className="sidebar-heading">
                            Data Master
                        </div>

                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#data-master"
                                aria-expanded="true" aria-controls="data-master">
                                <i className="fas fa-database"></i>
                                <span> Data Master</span>
                            </a>
                            <div id="data-master" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Menu :</h6>
                                    <Link className="collapse-item" to="/master-user">Master User</Link>
                                    <a className="collapse-item" href="cards.html">Master Menu</a>
                                    <Link className="collapse-item" to="/master-stock">Master Stock</Link>
                                    <a className="collapse-item" href="cards.html">Master Brand</a>
                                </div>
                            </div>
                        </li>

                        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                                aria-expanded="true" aria-controls="collapseUtilities">
                                <i className="fas fa-fw fa-wrench"></i>
                                <span>Configure</span>
                            </a>
                            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Custom Utilities:</h6>
                                    <a className="collapse-item" href="utilities-color.html">Colors</a>
                                    <a className="collapse-item" href="utilities-border.html">Borders</a>
                                    <a className="collapse-item" href="utilities-animation.html">Animations</a>
                                    <a className="collapse-item" href="utilities-other.html">Other</a>
                                </div>
                            </div>
                        </li>
        </div>
    );
};

export default DataMaster;