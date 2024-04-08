import React from "react";


const Pemesanan = () => {
    return (
        <div>
                               {/*   <!-- Heading --> */}
                               <div className="sidebar-heading">
                            Pemesanan
                        </div>

                        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <i className="fa fa-shopping-basket"></i>
                                <span>Request Barang</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Menu: </h6>
                                    <a className="collapse-item" href="buttons.html">Tambah Request</a>
                                    <a className="collapse-item" href="cards.html">Daftar Request</a>
                                    <a className="collapse-item" href="cards.html">Status Request</a>
                                </div>
                            </div>
                        </li>

                        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#utilities-pemesanan"
                                aria-expanded="true" aria-controls="utilities-pemesanan">
                                <i className="fas fa-fw fa-wrench"></i>
                                <span>Configure</span>
                            </a>
                            <div id="utilities-pemesanan" className="collapse" aria-labelledby="headingUtilities"
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
}

export default Pemesanan;